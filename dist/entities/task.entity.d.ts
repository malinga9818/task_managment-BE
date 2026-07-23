import type { Relation } from "typeorm";
import { User } from "./user.entity.js";
export declare class Task {
    id: number;
    title: string;
    description: string;
    due_date: Date;
    priority: string;
    status: string;
    createdAt?: Date | null;
    user: Relation<User>;
}
//# sourceMappingURL=task.entity.d.ts.map