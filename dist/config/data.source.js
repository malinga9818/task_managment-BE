import { DataSource } from "typeorm";
import { User } from "../entities/user.entity.js";
import { Task } from "../entities/task.entity.js";
import dotenv from "dotenv";
dotenv.config();
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 5432),
    database: process.env.DB_NAME ?? "task_management",
    username: process.env.DB_USERNAME ?? "postgres",
    password: process.env.DB_PASSWORD ?? "",
    synchronize: true,
    entities: [User, Task]
});
//# sourceMappingURL=data.source.js.map