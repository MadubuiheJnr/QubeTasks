import mongoose, { Schema } from "mongoose";

const activityLogSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        "created_task",
        "updated_task",
        "updated_task_title",
        "updated_task_description",
        "updated_task_assignees",
        "updated_task_priority",
        "created_subtask",
        "updated_subtask",
        "updated_subtask_Completed_status",
        "completed_task",
        "created_project",
        "updated_project",
        "completed_project",
        "created_workspace",
        "updated_workspace",
        "added_comment",
        "added_member",
        "removed_member",
        "joined_workspace",
        "transferred_workspace_ownership",
        "added_attachment",
      ],
    },
    resourceType: {
      type: String,
      required: true,
      enum: ["Task", "Project", "Workspace", "Comment", "User"],
    },
    resourceId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    details: {
      type: Object,
    },
  },
  { timestamps: true }
);

const ActivityLogModel = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLogModel;
