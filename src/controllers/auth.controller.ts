import { register } from "../services/auth.service.js";
import type { Request, Response } from "express";
import { loginUser } from "../services/auth.service.js";

export const registerUser = async (req:Request, res:Response) => {
   
    try{
        console.log(req.body);
        const {firstName, lastName, email, password} = req.body;
        const result = await register({firstName, lastName, email, password});
        res.status(200).json(result);
    }catch (err:any){
        res.status(404).json({message:err.message})
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
        res.status(404).json({message:err.message});
    } 
}


export const userLogout = async(rer:Request, res:Response) => {
    res.clearCookie("token", {
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    });

    res.status(200).json({message:"Logged out successfully"})
}