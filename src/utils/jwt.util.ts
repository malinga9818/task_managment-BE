import jwt from "jsonwebtoken";
import dotnet from "dotenv"
dotnet.config()

export const generateToken = async (payload:object) => {
    return jwt.sign(payload, process.env.SECRET_KEY!, {expiresIn:"1d",});
}