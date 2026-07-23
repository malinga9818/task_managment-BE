import jwt from "jsonwebtoken";
import dotnet from "dotenv";
dotnet.config();
export const generateToken = async (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d", });
};
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
};
//# sourceMappingURL=jwt.util.js.map