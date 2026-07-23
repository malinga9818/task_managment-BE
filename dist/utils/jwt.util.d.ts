export type AuthUser = {
    user_id: string;
    email: string;
};
export declare const generateToken: (payload: object) => Promise<string>;
export declare const verifyToken: (token: string) => AuthUser | null;
//# sourceMappingURL=jwt.util.d.ts.map