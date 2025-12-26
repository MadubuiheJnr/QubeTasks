import express from "express";
import { validateRequest } from "zod-express-middleware";
import authMiddleware from "../middleware/auth-middleware.js";
import { projectSchema } from "../libs/validate-schema.js";
import {
  archiveProject,
  createProject,
  getProjectDetails,
  getProjectTasks,
} from "../controllers/project-controller.js";
import { z } from "zod";

const router = express.Router();

router.post(
  "/:workspaceId/create-project",
  authMiddleware,
  validateRequest({
    params: z.object({
      workspaceId: z.string(),
    }),
    body: projectSchema,
  }),
  createProject
);

router.put(
  "/:projectId/archive",
  authMiddleware,
  validateRequest({
    params: z.object({
      projectId: z.string(),
    }),
  }),
  archiveProject
);

router.get(
  "/:projectId",
  authMiddleware,
  validateRequest({
    params: z.object({ projectId: z.string() }),
  }),
  getProjectDetails
);

router.get(
  "/:projectId/tasks",
  authMiddleware,
  validateRequest({ params: z.object({ projectId: z.string() }) }),
  getProjectTasks
);

export default router;
