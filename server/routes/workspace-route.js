import express from "express";
import { validateRequest } from "zod-express-middleware";
import { workspaceSchema } from "../libs/validate-schema.js";
import authMiddleware from "../middleware/auth-middleware.js";
import {
  createWorkSpace,
  getWorkSpaceDetails,
  getWorkSpaces,
  getWorkSpacesProjects,
} from "../controllers/workspace-controller.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validateRequest({ body: workspaceSchema }),
  createWorkSpace
);
router.get("/", authMiddleware, getWorkSpaces);
router.get("/:workspaceId", authMiddleware, getWorkSpaceDetails);
router.get("/:workspaceId/projects", authMiddleware, getWorkSpacesProjects);

export default router;
