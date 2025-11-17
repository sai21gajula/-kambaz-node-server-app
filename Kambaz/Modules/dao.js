import { v4 as uuidv4 } from "uuid"

export default function ModulesDao(db) {
  function findModulesForCourse(courseId) {
    const { modules } = db
    return modules.filter((module) => module.course === courseId)
  }

  function createModule(module) {
    const newModule = { ...module, _id: uuidv4() }
    db.modules = [...db.modules, newModule]
    return newModule
  }

  function updateModule(moduleId, moduleUpdates) {
    const { modules } = db
    const module = modules.find((m) => m._id === moduleId)
    Object.assign(module, moduleUpdates)
    return module
  }

  function deleteModule(moduleId) {
    const { modules } = db
    db.modules = modules.filter((module) => module._id !== moduleId)
    return { status: 200 }
  }

  return {
    findModulesForCourse,
    createModule,
    updateModule,
    deleteModule,
  }
}
