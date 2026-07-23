import type { Relation } from "typeorm";
import { Task } from "./task.entity.js";
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    tasks: Relation<Task>[];
}
//# sourceMappingURL=user.entity.d.ts.map