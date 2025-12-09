import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CoursesDao(db) {
  const enrollmentsDao = EnrollmentsDao(db);

  function findAllCourses() {
    return model.find({}, { name: 1, description: 1, image: 1 });
  }

  async function findCoursesForEnrolledUser(userId) {
    const enrolledCourses = await enrollmentsDao.findCoursesForUser(userId);
    return enrolledCourses;
  }

  function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    return model.create(newCourse);
  }

  function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
  }

  function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
  }

  return { findAllCourses, findCoursesForEnrolledUser, createCourse, deleteCourse, updateCourse };
}
