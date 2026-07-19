import type { Request, Response } from "express";
import { userView } from "../services/user.service.js";

export const userProfile = async (req:Request, res:Response) => {
    const {user_id} = (req as any).user;
    const result = await userView(user_id);
    return res.status(200).json(result);
}