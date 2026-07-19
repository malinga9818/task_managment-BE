import { register } from "../services/auth.service.js";
import type { Request, Response } from "express";
import { loginUser } from "../services/auth.service.js";

export const registerUser = async (req:Request, res:Response) => {
   
    try{
        const {firstName, lastName, email, password} = req.body;
        const result = await register({firstName, lastName, email, password});
        res.status(200).json(result);
    }catch (err:any){
        res.status(400).json({message:err.message})
    }
}


export const userLogin = async (req:Request, res:Response) => {
    try{
        const {email, password} = req.body;
        const result = await loginUser({email, password})
        res.cookie("token", result.token, {
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge: 1000 * 60 * 60 * 24
        });
        res.status(200).json(result.email);
    } 
    catch (err:any){
        res.status(400).json({message:err.message});
    } 
}