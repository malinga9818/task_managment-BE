import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type:"postgres",
    host:"localhost",
    port:5432,
    database:"task_managment",
    username:"postgres",
    password:"12345",
    synchronize:false,
    entities:[]
});