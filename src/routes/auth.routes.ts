import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { userLogin } from "../controllers/auth.controller.js";


const router = Router();

router.post("/register", registerUser);
router.post("/login", userLogin);

export default router;