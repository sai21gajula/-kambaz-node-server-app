import { v4 as uuidv4 } from "uuid"

export default function AssignmentsDao(db) {
  function getAssignmentsByCourse(courseId) {
    const { assignments } = db
    return assignments.filter((assignment) => assignment.course === courseId)
  }

  function findAssignmentById(assignmentId) {
    const { assignments } = db
    return assignments.find((assignment) => assignment._id === assignmentId)
  }

  function createAssignmentForCourse(courseId, assignment, createdBy) {
    const { assignments } = db
    const newAssignment = {
      ...assignment,
      _id: uuidv4(),
      course: courseId,
      createdBy: createdBy || "SYSTEM",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    db.assignments = [...assignments, newAssignment]
    return newAssignment
  }

  function updateAssignment(assignmentId, updates) {
    const { assignments } = db
    const assignment = assignments.find((a) => a._id === assignmentId)
    if (!assignment) return null
    Object.assign(assignment, updates, {
      updatedAt: new Date().toISOString(),
    })
    return assignment
  }

  function deleteAssignment(assignmentId) {
    const { assignments } = db
    const index = assignments.findIndex((a) => a._id === assignmentId)
    if (index === -1) return false
    db.assignments = assignments.filter((a) => a._id !== assignmentId)
    return true
  }

  return {
    getAssignmentsByCourse,
    findAssignmentById,
    createAssignmentForCourse,
    updateAssignment,
    deleteAssignment,
  }
}
