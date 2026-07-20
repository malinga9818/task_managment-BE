import type { Request, Response } from "express";
import { taskMake } from "../services/task.service.js";

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