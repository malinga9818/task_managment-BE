import type { Request, Response } from "express";
import { taskMake } from "../services/task.service.js";
import { viewATask } from "../services/task.service.js";
import { aTaskUpdate } from "../services/task.service.js";
import { aTaskDelete } from "../services/task.service.js";
import { userTasksGet } from "../services/task.service.js";
import { cardSummery } from "../services/task.service.js";

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

export const updateATask = async (req:Request, res:Response) => {
    try{
        const task_id = Number(req.params.id);
        const {user_id} = (req as any).user;
        const data = req.body;
        const result = await aTaskUpdate({task_id, user_id, data});
        res.status(200).json(result);
    }
    catch (err:any) {
        res.status(400).json({message:err.message});
    }
}

export const deleteATask = async (req:Request, res:Response) => {
    try{
        const task_id = Number (req.params.id);
        const {user_id} = (req as any).user;
        const result = await aTaskDelete(task_id, user_id);
        res.status(200).json(result);
    }
    catch (err:any) {
        res.status(400).json({message:err.message});
    }
}

export const getUserTasks = async (req:Request, res:Response) => {
    
    try {
        const {status, priority} = (req.query);
        const {user_id} = (req as any).user;
        const result = await userTasksGet(user_id, {
            status:status as string, 
            priority:priority as string
        });
        return res.status(200).json(result);
    }
    catch (err:any) {
        res.status(400).json({message:err.message});
    }
}

export const viewSummeryCard = async (req:Request, res:Response) => {
    try{
        const {user_id} = (req as any).user;
        const result = await cardSummery(user_id);
        res.status(200).json(result);
    }
    catch (err:any) {
        res.status(400).json({message:err.message});
    }
}
