import jwt from "jsonwebtoken";
import dotnet from "dotenv"
dotnet.config()

export type AuthUser = {user_id:string, email:string}

export const generateToken = async (payload:object) => {
    return jwt.sign(payload, process.env.SECRET_KEY!, {expiresIn:"1d",});
}

export const verifyToken = (token:string) : AuthUser | null => {
    return jwt.verify(token, process.env.SECRET_KEY!) as AuthUser
}