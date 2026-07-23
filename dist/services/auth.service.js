import { AppDataSource } from "../config/data.source.js";
import { User } from "../entities/user.entity.js";
import brcypt from "bcrypt";
import { generateToken } from "../utils/jwt.util.js";
const userRegisterRepo = AppDataSource.getRepository(User);
export const register = async ({ firstName, lastName, email, password }) => {
    const isUser = await userRegisterRepo.findOne({
        where: { email: email }
    });
    if (isUser) {
        throw new Error("The User Already has registered: !");
    }
    const hashedPasswod = await brcypt.hash(password, 10);
    const newUser = userRegisterRepo.create({
        firstName,
        lastName,
        email,
        password: hashedPasswod
    });
    const savedUser = await userRegisterRepo.save(newUser);
    const { password: _, ...safeUser } = savedUser; // retrun registered user without password
    return safeUser;
};
export const loginUser = async ({ email, password }) => {
    const isUser = await userRegisterRepo.findOne({
        where: {
            email: email
        }
    });
    if (!isUser) {
        throw new Error("Invalid email or password:");
    }
    console.log(isUser);
    const isMatch = await brcypt.compare(password, isUser.password); //password has store with hashed
    if (!isMatch) {
        throw new Error("Invalid email or password:");
    }
    const token = await generateToken({
        user_id: isUser.id,
        email: isUser.email,
    });
    return { token, email: isUser.email };
};
//# sourceMappingURL=auth.service.js.map