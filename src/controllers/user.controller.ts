import type { Request, Response } from "express";
import { userView } from "../services/user.service.js";
import { updateUserProfile } from "../services/user.service.js";

export const userProfile = async (req:Request, res:Response) => {
    
    try{
        const {user_id} = (req as any).user;
        const result = await userView(user_id);
        return res.status(200).json(result);
    }
    catch (err:any){
        res.status(404).json({message:err.message});
    }
    
    
}

export const userProfileUpdate = async (req:Request, res:Response) => {
    try{
        const {user_id} = (req as any).user;
        const data = req.body;
        const result = await updateUserProfile({user_id, data});
        return res.status(200).json(result)
    }
    catch (err:any) {
        res.status(404).json({message:err.message});
    }
    
    
}