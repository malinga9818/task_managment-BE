import { AppDataSource } from "../config/data.source.js"
import type { UpdateUserDto } from "../dto/updateUser.dto.js";
import { User } from "../entities/user.entity.js"

interface UserProfileUpdate{
    user_id:number,
    data: UpdateUserDto
}

const userRepo = AppDataSource.getRepository(User);
export const userView = async (user_id:number) => {
     const user = await userRepo.findOne({
        where:{
            id:user_id
        }
    });

    if (!user) {
        throw new Error(`User with id ${user_id} not found`);
    }
    const{password:_, ...userWhthoutPassword} = user;
    return userWhthoutPassword

} 

export const updateUserProfile = async ({user_id, data}:UserProfileUpdate) => {
    const user = await userRepo.findOne({ 
        where:{
            id: user_id
        }
    });
    
    if (!user) {
        throw new Error(`User with id ${user_id} not found`);
    }
    
    userRepo.merge(user!, data);
    const updatedUser = await userRepo.save(user!);

    const {password:_, ...safeUser} = updatedUser;
    return safeUser;
}