import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util.js";

export const authGurd = async (req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({message:"Token not provided "});
    }

    try{
        const decoded = verifyToken(token);
        (req as any).user = {user_id : decoded?.user_id, email:decoded?.email}
        next()
    }
    catch(err:any) {
        res.status(401).json({message:"Invalid token"});
    }
}