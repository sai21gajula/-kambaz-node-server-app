import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    course: {
      type: String,
      ref: "CourseModel",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    points: {
      type: Number,
      default: 100,
    },
    due: String,
    from: String,
    until: String,
  },
  { collection: "assignments" }
);

// Index for frequently queried fields
assignmentSchema.index({ course: 1 });
assignmentSchema.index({ _id: 1 });

export default assignmentSchema;
