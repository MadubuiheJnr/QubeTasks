import express from "express";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import {
  changePassword,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);
router.put(
  "/profile",
  authMiddleware,
  validateRequest({
    body: z.object({
      name: z.string(),
      profilePicture: z.string().optional(),
    }),
  }),
  updateUserProfile
);

router.put(
  "/change-password",
  authMiddleware,
  validateRequest({
    body: z.object({
      currentPassword: z.string(),
      newPassword: z.string(),
      confirmPassword: z.string(),
    }),
  }),
  changePassword
);

export default router;
