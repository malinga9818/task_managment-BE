import { DataSource } from "typeorm";
import { User } from "../entities/user.entity.js";
import { Task } from "../entities/task.entity.js";

export const AppDataSource = new DataSource({
    type:"postgres",
    host:"localhost",
    port:5432,
    database:"task_managment",
    username:"postgres",
    password:"12345",
    synchronize:true,
    entities:[User, Task]
});