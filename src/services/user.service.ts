import { AppDataSource } from "../config/data.source.js"
import type { UpdateUserDto } from "../dto/updateUser.dto.js";
import { User } from "../entities/user.entity.js"

interface UserProfileUpdate{
    user_id:number,
    data: UpdateUserDto
}

const userRepo = AppDataSource.getRepository(User);
export const userView = async (user_id:number) => {
     return await userRepo.findOne({
        where:{
            id:user_id
        }
    });
} 

export const updateUserProfile = async ({user_id, data}:UserProfileUpdate) => {
    const user = await userRepo.findOne({ 
        where:{
            id: user_id
        }
    });
    
    userRepo.merge(user!, data);
    const updatedUser = await userRepo.save(user!);

    const {password:_, ...safeUser} = updatedUser;
    return safeUser;
}