import AssignmentsDao from "../Assignments/dao.js"

export default function AssignmentsRoutes(app, db) {
  const dao = AssignmentsDao(db)

  const getAssignmentsForCourse = (req, res) => {
    const { courseId } = req.params
    const assignments = dao.getAssignmentsByCourse(courseId)
    res.json(assignments)
  }

  const createAssignmentForCourse = (req, res) => {
    const { courseId } = req.params
    const assignment = req.body
    const createdBy = req.session?.currentUser?._id || "SYSTEM"
    
    if (!assignment.title || assignment.title.trim() === "") {
      return res.status(400).json({ error: "Title is required" })
    }

    const newAssignment = dao.createAssignmentForCourse(
      courseId,
      assignment,
      createdBy
    )
    res.status(201).json(newAssignment)
  }

  const updateAssignment = (req, res) => {
    const { assignmentId } = req.params
    const updates = req.body

    if (updates.title !== undefined && updates.title.trim() === "") {
      return res.status(400).json({ error: "Title cannot be empty" })
    }

    const updated = dao.updateAssignment(assignmentId, updates)
    if (!updated) {
      return res.status(404).json({ error: "Assignment not found" })
    }
    res.json(updated)
  }

  const deleteAssignment = (req, res) => {
    const { assignmentId } = req.params
    const deleted = dao.deleteAssignment(assignmentId)
    if (!deleted) {
      return res.status(404).json({ error: "Assignment not found" })
    }
    res.json({ success: true, deletedId: assignmentId })
  }

  const getAssignmentById = (req, res) => {
    const { assignmentId } = req.params
    const assignment = dao.findAssignmentById(assignmentId)
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" })
    }
    res.json(assignment)
  }

  app.get("/api/courses/:courseId/assignments", getAssignmentsForCourse)
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse)
  app.get("/api/assignments/:assignmentId", getAssignmentById)
  app.put("/api/assignments/:assignmentId", updateAssignment)
  app.delete("/api/assignments/:assignmentId", deleteAssignment)
}
