import { verifyToken } from "../utils/jwt.util.js";
export const authGurd = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Token not provided " });
    }
    try {
        const decoded = verifyToken(token);
        req.user = { user_id: decoded?.user_id, email: decoded?.email };
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};
//# sourceMappingURL=auth.middleware.js.map