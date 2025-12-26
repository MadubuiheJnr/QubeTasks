import ProjectModel from "../models/project-model.js";
import TaskModel from "../models/task-model.js";
import WorkspaceModel from "../models/workspace-model.js";
import recordActivity from "../libs/record-activity.js";

const createProject = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { title, description, status, startDate, dueDate, tags, members } =
      req.body;

    const workspace = await WorkspaceModel.findById(workspaceId);

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    const isMember = workspace.members.some(
      (member) => member.user.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        message: "Only workspace members can create a project",
      });
    }

    const tagsArray = tags ? tags.split(",") : [];

    const newProject = await ProjectModel.create({
      title,
      description,
      status,
      startDate,
      dueDate,
      tags: tagsArray,
      workspace: workspaceId,
      members,
      createdBy: req.user._id,
    });

    workspace.projects.push(newProject._id);
    await workspace.save();

    return res.status(201).json(newProject);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getProjectDetails = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await ProjectModel.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const isMember = project.members.some(
      (member) => member.user.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        message: "You are not a member of this project",
      });
    }

    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await ProjectModel.findById(projectId).populate(
      "members.user"
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const isMember = project.members.some(
      (member) => member.user._id.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        message: "You are not a member of this project",
      });
    }

    const tasks = await TaskModel.find({
      project: projectId,
      isArchived: false,
    })
      .populate("assignees", "name profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json({
      project,
      tasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const archiveProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await ProjectModel.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const Workspace = await WorkspaceModel.findById(project.workspace);

    if (!Workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    const isMember = project.members.find(
      (member) => member.user.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        message: "You are not a member of this project",
      });
    }

    const allowedRoles = ["manager"];
    if (!allowedRoles.includes(isMember.role)) {
      return res.status(403).json({
        message: "Only project managers can archive projects",
      });
    }

    const isArchived = project.isArchived;

    project.isArchived = !isArchived;
    await project.save();

    // record activity
    await recordActivity(
      req.user._id,
      "updated_project",
      "Project",
      projectId,
      {
        description: `${
          isArchived
            ? "removed project from archived:"
            : "added project to archived:"
        }  ${project.title}`,
      }
    );

    res.status(200).json(project);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { createProject, getProjectDetails, getProjectTasks, archiveProject };
