import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { userLogin } from "../controllers/auth.controller.js";
import { userLogout } from "../controllers/auth.controller.js";
const router = Router();
router.post("/register", registerUser);
router.post("/login", userLogin);
router.post("/logout", userLogout);
export default router;
//# sourceMappingURL=auth.routes.js.map