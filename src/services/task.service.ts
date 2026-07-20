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
    console.log("service date", data);
    console.log(user_id);
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

    if(!task) {
        throw new Error(`The task with ${task_id} not found`);
    }

    taskRepo.merge(task, data);
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

    return tasks;
}