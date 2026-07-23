import type { UpdateUserDto } from "../dto/updateUser.dto.js";
import { User } from "../entities/user.entity.js";
interface UserProfileUpdate {
    user_id: number;
    data: UpdateUserDto;
}
export declare const userView: (user_id: number) => Promise<User | null>;
export declare const updateUserProfile: ({ user_id, data }: UserProfileUpdate) => Promise<{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    tasks: import("typeorm").Relation<import("../entities/task.entity.js").Task>[];
}>;
export {};
//# sourceMappingURL=user.service.d.ts.map