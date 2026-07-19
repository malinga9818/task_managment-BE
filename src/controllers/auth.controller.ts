import { register } from "../services/auth.service.js";
import type { Request, Response } from "express";


export const registerUser = async (req:Request, res:Response) => {
   
    try{
        const {firstName, lastName, email, password} = req.body;
        const result = await register({firstName, lastName, email, password});
        res.status(200).json(result);
    }catch (err:any){
        res.status(400).json({message:err.message})
    }
}