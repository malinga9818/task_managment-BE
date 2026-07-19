import { Router } from "express";
import { userProfile } from "../controllers/user.controller.js";
import { authGurd } from "../middleware/auth.middleware.js";
import { userProfileUpdate } from "../controllers/user.controller.js";
import { validateDto } from "../middleware/validate.middleware.js";
import { UpdateUserDto } from "../dto/updateUser.dto.js";

const router = Router();

router.get("/me",authGurd, userProfile);
router.patch("/me",validateDto(UpdateUserDto), authGurd, userProfileUpdate);

export default router;