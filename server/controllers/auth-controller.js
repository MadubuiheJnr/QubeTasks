import UserModel from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import VerificationModel from "../models/verification-model.js";
import { sendEmail } from "../libs/send-email.js";
import aj from "../libs/arcjet.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const decision = await aj.protect(req, { email });
    console.log("Arcjet decision", decision.isDenied());

    if (decision.isDenied()) {
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid email address" }));
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const verificationToken = jwt.sign(
      { userId: newUser._id, purpose: "email-verification" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    await VerificationModel.create({
      userId: newUser._id,
      token: verificationToken,
      expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
    });

    // Send verification email logic goes here
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    const emailBody = `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`;
    const emailSubject = "Email Verification";

    const isEmailSent = await sendEmail(email, emailSubject, emailBody);

    if (!isEmailSent) {
      return res
        .status(500)
        .json({ message: "Failed to send verification email" });
    }

    res
      .status(201)
      .json({ message: "Verification email sent. Please check your inbox." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user.isEmailVerified) {
      const existingVerification = await VerificationModel.findOne({
        userId: user._id,
      });

      let verificationToken;

      if (existingVerification && existingVerification.expiresAt > new Date()) {
        return res
          .status(400)
          .json({ message: "Email is not verified. Please check your inbox." });
      } else {
        await VerificationModel.findByIdAndDelete(existingVerification._id);

        verificationToken = jwt.sign(
          { userId: user._id, purpose: "email-verification" },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        await VerificationModel.create({
          userId: user._id,
          token: verificationToken,
          expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
        });
      }

      // Send verification email logic goes here
      const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
      const emailBody = `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`;
      const emailSubject = "Email Verification";

      const isEmailSent = await sendEmail(email, emailSubject, emailBody);

      if (!isEmailSent) {
        return res
          .status(500)
          .json({ message: "Failed to send verification email" });
      }

      res
        .status(201)
        .json({ message: "Verification email sent. Please check your inbox." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, purpose: "login" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { userId, purpose } = payload;

    if (purpose !== "email-verification") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const verification = await VerificationModel.findOne({ userId, token });

    if (!verification) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isTokenExpired = verification.expiresAt < new Date();
    if (isTokenExpired) {
      return res
        .status(401)
        .json({ message: "Verification token has expired" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    user.isEmailVerified = true;
    await user.save();

    await VerificationModel.findByIdAndDelete(verification._id);

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const resetPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.isEmailVerified) {
      return res.status(400).json({
        message: "Please verify your email before resetting your password.",
      });
    }

    const existingVerification = await VerificationModel.findOne({
      userId: user._id,
    });

    if (existingVerification && existingVerification.expiresAt > new Date()) {
      return res.status(400).json({
        message: "A reset link has already been sent. Please check your inbox.",
      });
    }

    if (existingVerification && existingVerification.expiresAt < new Date()) {
      await VerificationModel.findByIdAndDelete(existingVerification._id);
    }

    const resetPasswordToken = jwt.sign(
      { userId: user._id, purpose: "password-reset" },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    await VerificationModel.create({
      userId: user._id,
      token: resetPasswordToken,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
    });

    // Send reset password email logic goes here
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetPasswordToken}`;
    const emailBody = `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 15 minutes.</p>`;
    const emailSubject = "Password Reset Request";

    const isEmailSent = await sendEmail(email, emailSubject, emailBody);

    if (!isEmailSent) {
      return res
        .status(500)
        .json({ message: "Failed to send password reset email" });
    }

    res
      .status(200)
      .json({ message: "Password reset email sent. Please check your inbox." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyResetPasswordAndSetNewPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // jwt.verify throws for expired/invalid tokens; handle explicitly
      if (err && err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Verification token has expired" });
      }
      if (err && err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }
      console.error("Unexpected JWT verify error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (!payload) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { userId, purpose } = payload;

    if (purpose !== "password-reset") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const verification = await VerificationModel.findOne({ userId, token });

    if (!verification) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isTokenExpired = verification.expiresAt < new Date();
    if (isTokenExpired) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    await VerificationModel.findByIdAndDelete(verification._id);

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  registerUser,
  loginUser,
  verifyEmail,
  resetPasswordRequest,
  verifyResetPasswordAndSetNewPassword,
};
