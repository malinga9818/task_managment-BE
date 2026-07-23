import { AppDataSource } from "../config/data.source.js";
import type { CreateTaskDto } from "../dto/taskCreate.dto.js";
import type { UpdateTaskDto } from "../dto/taskUpdate.dto.js";
import { Task } from "../entities/task.entity.js";

interface TaskCreate {
    user_id: number;
    data: CreateTaskDto;
}

interface TaskUpdate {
    task_id: number;
    user_id: number;
    data: UpdateTaskDto;
}




const taskRepo = AppDataSource.getRepository(Task)
export const taskMake = async ({data, user_id}:TaskCreate) => {
    const task = taskRepo.create({
        title:data.title,
        description:data.description,
        due_date:data.due_date,
        priority:data.priority,
        status:data.status,
        user:{id:user_id} //sets the ralation using just the id
    });

    return await taskRepo.save(task);
}

export const viewATask = async (task_id: number, user_id:number) => {
    const task = await taskRepo.findOne({
        where:{
            id:task_id,
            user: {
                id:user_id
            }
        }
    });

    if (!task) {
        throw new Error(`Task with id ${task_id} not found`);
    }

    return task;
    
} 


export const aTaskUpdate = async({task_id, user_id, data}:TaskUpdate) => {
    const task = await taskRepo.findOne({
        where:{
            id:task_id,
            user:{
                id:user_id
            }
        }
    })

    console.log("1", task);
    if(!task) {
        throw new Error(`The task with ${task_id} not found`);
    }

    const oldStatus = task.status

    Object.assign(task, data);

    console.log(task)
    if (oldStatus !== "Completed" && task.status === "Completed" ){
        task.createdAt =new Date();
    }

    if (oldStatus === "Completed" && task.status !== "Completed"){
        task.createdAt = null;
    }

    return await taskRepo.save(task);
}

export const aTaskDelete = async (task_id:number, user_id:number) => {
       const task = await taskRepo.findOne({
            where:{
                id:task_id,
                user:{
                    id:user_id
                }
            }
       });

       if(!task){
            throw new Error(`The task with ${task_id} not found`);
       }

       await taskRepo.remove(task);
       return task;
}

export const userTasksGet = async (user_id:number, filters: {status?:string; priority?:string}) => {
    const where:any = {user: {id: user_id}};
    if (filters.status) where.status = filters.status;
    if (filters.priority) where.priority = filters.priority;

    const tasks = await taskRepo.find({
        where,
        order: {id: "ASC"}
    })

    if (tasks.length === 0) {
        throw new Error("Task not found");
    }

    // return tasks;
     return tasks.map((task) => ({
        ...task,
        due_date: task.due_date
            ? new Date(task.due_date).toISOString().split("T")[0]
            : null,
    }));
}

export const cardSummery = async (user_id:number) => {
    const tasks = await taskRepo.find({
        where:{
            user:{id:user_id}
        }
    });
    
    let todo = 0;
    let inprogress = 0;
    let completed = 0;

    let low = 0;
    let medium = 0;
    let high = 0;

    let completedToday = 0;
    let overdue = 0;

    const now = new Date();
    const todayStart = new Date (now.getFullYear(), now.getMonth(), now.getDate())


    tasks.forEach((task) => {
        if (task.status === "To Do") todo++
        else if(task.status === "In Progress") inprogress++
        else if(task.status === "Completed") completed++

        if (task.priority === "High") high++
        else if (task.priority === "Medium") medium++
        else if (task.priority === "Low") low++

        if (task.status === "Completed" && task.createdAt){
            const completedDate = new Date (task.createdAt);
            if (completedDate >= todayStart) completedToday ++
        }

        if (task.status !== "Completed" && task.due_date && new Date(task.due_date) < now){
            overdue++
        }

    });

    return {
        statusDistribution:{todo, inprogress, completed},
        priorityDistribution:{high, medium, low},
        summeryCard:{
            totalActive:inprogress+todo,
            completedToday,
            overdue
        }
    }

}