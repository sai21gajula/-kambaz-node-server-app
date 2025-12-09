import mongoose from "mongoose";
import assignmentSchema from "./schema.js";

export const AssignmentModel = mongoose.model(
  "AssignmentModel",
  assignmentSchema
);
