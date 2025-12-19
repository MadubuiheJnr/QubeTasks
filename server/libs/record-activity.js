import ActivityLogModel from "../models/activity-model.js";

const recordActivity = async (
  userId,
  action,
  resourceType,
  resourceId,
  details
) => {
  try {
    await ActivityLogModel.create({
      user: userId,
      action,
      resourceType,
      resourceId,
      details,
    });
  } catch (error) {
    console.log(error);
  }
};

export default recordActivity;
