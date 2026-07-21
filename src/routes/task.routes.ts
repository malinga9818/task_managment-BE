import { Router } from "express";
import { createTask } from "../controllers/task.controller.js";
import { authGurd } from "../middleware/auth.middleware.js";
import { validateDto } from "../middleware/validate.middleware.js";
import { CreateTaskDto } from "../dto/taskCreate.dto.js";
import { getATask } from "../controllers/task.controller.js";
import { updateATask } from "../controllers/task.controller.js";
import { UpdateTaskDto } from "../dto/taskUpdate.dto.js";
import { deleteATask } from "../controllers/task.controller.js";
import { getUserTasks } from "../controllers/task.controller.js";
import { viewSummeryCard } from "../controllers/task.controller.js";

const router = Router();
router.get("/", authGurd, getUserTasks);
router.post("/", authGurd, validateDto(CreateTaskDto), createTask);
router.get("/summery-card", authGurd, viewSummeryCard);
router.get("/:id", authGurd, getATask);
router.patch("/:id", authGurd, validateDto(UpdateTaskDto), updateATask);
router.delete("/:id", authGurd, deleteATask);

export default router;