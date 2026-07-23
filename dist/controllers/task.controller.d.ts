import type { Request, Response } from "express";
export declare const createTask: (req: Request, res: Response) => Promise<void>;
export declare const getATask: (req: Request, res: Response) => Promise<void>;
export declare const updateATask: (req: Request, res: Response) => Promise<void>;
export declare const deleteATask: (req: Request, res: Response) => Promise<void>;
export declare const getUserTasks: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const viewSummeryCard: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=task.controller.d.ts.map