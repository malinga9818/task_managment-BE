import { Router } from "express";
import { createTask } from "../controllers/task.controller.js";
import { authGurd } from "../middleware/auth.middleware.js";
import { validateDto } from "../middleware/validate.middleware.js";
import { CreateTaskDto } from "../dto/taskCreate.dto.js";

const router = Router();
router.post("/", authGurd, validateDto(CreateTaskDto), createTask);

export default router;