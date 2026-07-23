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
export declare const taskMake: ({ data, user_id }: TaskCreate) => Promise<Task>;
export declare const viewATask: (task_id: number, user_id: number) => Promise<Task>;
export declare const aTaskUpdate: ({ task_id, user_id, data }: TaskUpdate) => Promise<Task>;
export declare const aTaskDelete: (task_id: number, user_id: number) => Promise<Task>;
export declare const userTasksGet: (user_id: number, filters: {
    status?: string;
    priority?: string;
}) => Promise<{
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    createdAt?: Date | null;
    user: import("typeorm").Relation<import("../entities/user.entity.js").User>;
    due_date: string | null | undefined;
}[]>;
export declare const cardSummery: (user_id: number) => Promise<{
    statusDistribution: {
        todo: number;
        inprogress: number;
        completed: number;
    };
    priorityDistribution: {
        high: number;
        medium: number;
        low: number;
    };
    summeryCard: {
        totalActive: number;
        completedToday: number;
        overdue: number;
    };
}>;
export {};
//# sourceMappingURL=task.service.d.ts.map