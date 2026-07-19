import { AppDataSource } from "../config/data.source.js"
import { User } from "../entities/user.entity.js"

const userRepo = AppDataSource.getRepository(User);
export const userView = async (user_id:number) => {
     return await userRepo.findOne({
        where:{
            id:user_id
        }
    });
} 