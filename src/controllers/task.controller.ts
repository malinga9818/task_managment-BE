import type { Request, Response } from "express";
import { taskMake } from "../services/task.service.js";
import { viewATask } from "../services/task.service.js";

export const createTask = async (req:Request, res:Response) => {
    try{
        const {user_id} = (req as any).user;
        const result = await taskMake({data:req.body, user_id});
        res.status(200).json(result);
    }
    catch (err:any) {
        res.status(400).json({message:err.message});
    }
}

export const getATask = async (req:Request, res:Response) => {
    try{
        const task_id = Number(req.params.id);
        const {user_id} = (req as any).user;
        const result = await viewATask(task_id, user_id);
        res.status(200).json(result);                
    }
    catch(err:any) {
        res.status(400).json({message:err.message});
    }
}