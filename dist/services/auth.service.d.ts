interface UserDetails {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
interface UserLogin {
    email: string;
    password: string;
}
export declare const register: ({ firstName, lastName, email, password }: UserDetails) => Promise<{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    tasks: import("typeorm").Relation<import("../entities/task.entity.js").Task>[];
}>;
export declare const loginUser: ({ email, password }: UserLogin) => Promise<{
    token: string;
    email: string;
}>;
export {};
//# sourceMappingURL=auth.service.d.ts.map