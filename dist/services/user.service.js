import { AppDataSource } from "../config/data.source.js";
import { User } from "../entities/user.entity.js";
const userRepo = AppDataSource.getRepository(User);
export const userView = async (user_id) => {
    return await userRepo.findOne({
        where: {
            id: user_id
        }
    });
};
export const updateUserProfile = async ({ user_id, data }) => {
    const user = await userRepo.findOne({
        where: {
            id: user_id
        }
    });
    userRepo.merge(user, data);
    const updatedUser = await userRepo.save(user);
    const { password: _, ...safeUser } = updatedUser;
    return safeUser;
};
//# sourceMappingURL=user.service.js.map