import { userView } from "../services/user.service.js";
import { updateUserProfile } from "../services/user.service.js";
export const userProfile = async (req, res) => {
    try {
        const { user_id } = req.user;
        const result = await userView(user_id);
        return res.status(200).json(result);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};
export const userProfileUpdate = async (req, res) => {
    try {
        const { user_id } = req.user;
        const data = req.body;
        const result = await updateUserProfile({ user_id, data });
        return res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
//# sourceMappingURL=user.controller.js.map