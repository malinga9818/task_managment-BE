import { AppDataSource } from "../config/data.source.js";
import type { CreateTaskDto } from "../dto/taskCreate.dto.js";
import { Task } from "../entities/task.entity.js";

interface TaskCreate {
    user_id: number;
    data: CreateTaskDto;
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