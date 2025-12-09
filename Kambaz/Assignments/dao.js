import { AssignmentModel } from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  async function getAssignmentsByCourse(courseId) {
    const assignments = await AssignmentModel.find({ course: courseId }).lean();
    return assignments;
  }

  async function createAssignmentForCourse(courseId, assignment, createdBy) {
    const newAssignment = {
      _id: uuidv4(),
      course: courseId,
      title: assignment.title,
      description: assignment.description || "",
      points: assignment.points || 100,
      due: assignment.due || null,
      from: assignment.from || null,
      until: assignment.until || null,
    };

    const result = await AssignmentModel.create(newAssignment);
    return result.toObject();
  }

  async function updateAssignment(assignmentId, updates) {
    const updated = await AssignmentModel.findByIdAndUpdate(
      assignmentId,
      updates,
      { new: true }
    ).lean();
    return updated;
  }

  async function deleteAssignment(assignmentId) {
    const result = await AssignmentModel.deleteOne({ _id: assignmentId });
    return result.deletedCount > 0;
  }

  async function findAssignmentById(assignmentId) {
    const assignment = await AssignmentModel.findById(assignmentId).lean();
    return assignment;
  }

  async function deleteAssignmentsByCourse(courseId) {
    const result = await AssignmentModel.deleteMany({ course: courseId });
    return result.deletedCount;
  }

  return {
    getAssignmentsByCourse,
    createAssignmentForCourse,
    updateAssignment,
    deleteAssignment,
    findAssignmentById,
    deleteAssignmentsByCourse,
  };
}
