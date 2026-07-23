import { register } from "../services/auth.service.js";
import { loginUser } from "../services/auth.service.js";
export const registerUser = async (req, res) => {
    try {
        console.log(req.body);
        const { firstName, lastName, email, password } = req.body;
        const result = await register({ firstName, lastName, email, password });
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("password", password);
        console.log("email", email);
        const result = await loginUser({ email, password });
        console.log(result);
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24
        });
        res.status(200).json(result.email);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
export const userLogout = async (rer, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    res.status(200).json({ message: "Logged out successfully" });
};
//# sourceMappingURL=auth.controller.js.map