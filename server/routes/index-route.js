import express from "express";
import authRoutes from "./auth-route.js";
import workspaceRoutes from "./workspace-route.js";
import projectRoutes from "./project-routes.js";
import taskRoutes from "./task-routes.js";
import userRoutes from "./user-route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/workspaces", workspaceRoutes);
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);
router.use("/users", userRoutes);

export default router;
