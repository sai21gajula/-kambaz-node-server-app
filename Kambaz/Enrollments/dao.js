import model from "./model.js";

export default function EnrollmentsDao(db) {
  // Return all enrollments
  const findAllEnrollments = async () => {
    return await model.find();
  };

  // Return enrollment documents for a user
  const findEnrollmentsForUser = async (userId) => {
    return await model.find({ user: userId });
  };

  // Return enrollment documents for a course
  const findEnrollmentsForCourse = async (courseId) => {
    return await model.find({ course: courseId });
  };

  // Check if a user is enrolled in a course
  const isUserEnrolledInCourse = async (userId, courseId) => {
    const exists = await model.exists({ user: userId, course: courseId });
    return Boolean(exists);
  };

  // Return the Course documents a user is enrolled in (populated)
  const findCoursesForUser = async (userId) => {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
  };

  // Return the User documents enrolled in a course (populated)
  const findUsersForCourse = async (courseId) => {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
  };

  // Create an enrollment record (id is composite user-course)
  const enrollUserInCourse = async (userId, courseId) => {
    return await model.create({
      user: userId,
      course: courseId,
      _id: `${userId}-${courseId}`,
    });
  };

  // Delete an enrollment by user + course ids
  const unenrollUserFromCourse = async (userId, courseId) => {
    return await model.deleteOne({ user: userId, course: courseId });
  };

  // Delete an enrollment by enrollment id
  const unenrollUserFromCourseById = async (enrollmentId) => {
    return await model.deleteOne({ _id: enrollmentId });
  };

  // Delete all enrollments for a course
  const unenrollAllUsersFromCourse = async (courseId) => {
    return await model.deleteMany({ course: courseId });
  };

  return {
    findAllEnrollments,
    findEnrollmentsForUser,
    findEnrollmentsForCourse,
    isUserEnrolledInCourse,
    findCoursesForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollUserFromCourseById,
    unenrollAllUsersFromCourse,
  };
}
