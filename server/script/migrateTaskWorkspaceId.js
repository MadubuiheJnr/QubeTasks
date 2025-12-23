import dotenv from "dotenv/config";
import mongoose from "mongoose";
import TaskModel from "../models/task-model.js";
import ProjectModel from "../models/project-model.js";

const MONGO_URI = process.env.MONGODB_URI;

async function migrateTaskWorkspaceId() {
  try {
    // 1️⃣ Connect to database
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // 2️⃣ Find tasks missing workspaceId
    const tasks = await TaskModel.find({
      workspace: { $exists: false },
    });

    console.log(`🔍 Found ${tasks.length} tasks to migrate`);

    // 3️⃣ Loop through tasks
    for (const task of tasks) {
      // 4️⃣ Find the project linked to the task
      const project = await ProjectModel.findById(task.project);

      if (!project) {
        console.warn(`⚠️ Project not found for task ${task._id}. Skipping...`);
        continue;
      }

      // 5️⃣ Copy workspaceId from project to task
      task.workspace = project.workspace;
      await task.save();

      console.log(
        `✅ Task ${task._id} updated with workspaceId ${project.workspace}`
      );
    }

    console.log("🎉 Migration completed successfully");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    // 6️⃣ Close DB connection
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

// 7️⃣ Run the migration
migrateTaskWorkspaceId();
