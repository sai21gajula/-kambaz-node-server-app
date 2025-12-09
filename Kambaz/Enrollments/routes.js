import EnrollmentsDao from "../Enrollments/dao.js"

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db)

  const findAllEnrollments = async (req, res) => {
    const enrollments = await dao.findAllEnrollments()
    res.json(enrollments)
  }

  const findEnrollmentsForUser = async (req, res) => {
    const { userId } = req.params
    const enrollments = await dao.findEnrollmentsForUser(userId)
    res.json(enrollments)
  }

  const findEnrollmentsForCourse = async (req, res) => {
    const { courseId } = req.params
    const enrollments = await dao.findEnrollmentsForCourse(courseId)
    res.json(enrollments)
  }

  const enrollUserInCourse = async (req, res) => {
    const { userId, courseId } = req.body

    if (!userId || !courseId) {
      return res.status(400).json({ error: "Missing userId or courseId" })
    }

    const enrollment = await dao.enrollUserInCourse(userId, courseId)
    if (!enrollment) {
      return res.status(409).json({ error: "User already enrolled in course" })
    }
    res.status(201).json(enrollment)
  }

  const unenrollUserFromCourse = async (req, res) => {
    const { enrollmentId } = req.params
    const enrollment = await dao.unenrollUserFromCourseById(enrollmentId)
    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" })
    }
    res.json(enrollment)
  }

  app.get("/api/enrollments", findAllEnrollments)
  app.get("/api/enrollments/user/:userId", findEnrollmentsForUser)
  app.get("/api/enrollments/course/:courseId", findEnrollmentsForCourse)
  app.post("/api/enrollments", enrollUserInCourse)
  app.delete("/api/enrollments/:enrollmentId", unenrollUserFromCourse)
}
