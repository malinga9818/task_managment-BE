import { Router } from "express";
import { userProfile } from "../controllers/user.controller.js";
import { authGurd } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/me",authGurd, userProfile);

export default router;