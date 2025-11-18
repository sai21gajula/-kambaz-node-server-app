import { v4 as uuidv4 } from "uuid"

export default function EnrollmentsDao(db) {
  function findAllEnrollments() {
    const { enrollments } = db
    return enrollments
  }

  function findEnrollmentsForUser(userId) {
    const { enrollments } = db
    return enrollments.filter((enrollment) => enrollment.user === userId)
  }

  function findEnrollmentsForCourse(courseId) {
    const { enrollments } = db
    return enrollments.filter((enrollment) => enrollment.course === courseId)
  }

  function isUserEnrolledInCourse(userId, courseId) {
    const { enrollments } = db
    return enrollments.some(
      (enrollment) => enrollment.user === userId && enrollment.course === courseId
    )
  }

  function enrollUserInCourse(userId, courseId) {
    if (isUserEnrolledInCourse(userId, courseId)) {
      return null // Already enrolled
    }

    const { enrollments } = db
    const newEnrollment = {
      _id: uuidv4(),
      user: userId,
      course: courseId,
    }
    db.enrollments = [...enrollments, newEnrollment]
    return newEnrollment
  }

  function unenrollUserFromCourse(enrollmentId) {
    const { enrollments } = db
    const enrollment = enrollments.find((e) => e._id === enrollmentId)
    if (!enrollment) return null
    db.enrollments = enrollments.filter((e) => e._id !== enrollmentId)
    return enrollment
  }

  function unenrollUserFromCourseByIds(userId, courseId) {
    const { enrollments } = db
    const enrollment = enrollments.find(
      (e) => e.user === userId && e.course === courseId
    )
    if (!enrollment) return null
    db.enrollments = enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    )
    return enrollment
  }

  return {
    findAllEnrollments,
    findEnrollmentsForUser,
    findEnrollmentsForCourse,
    isUserEnrolledInCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollUserFromCourseByIds,
  }
}
