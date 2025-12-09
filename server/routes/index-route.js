import express from "express";
import authRoutes from "./auth-route.js";
import workspaceRoutes from "./workspace-route.js";
import projectRoutes from "./project-routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/workspaces", workspaceRoutes);
router.use("/projects", projectRoutes);

export default router;
