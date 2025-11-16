const assignment = {
  id: 1,
  title: 'NodeJS Assignment',
  description: 'Create a NodeJS server with ExpressJS',
  due: '2021-10-10',
  completed: false,
  score: 0,
}

const moduleObj = {
  id: 'm1',
  name: 'Introduction to NodeJS',
  description: 'Basics of Node and Express',
  course: 'Full Stack 101',
}

export default function WorkingWithObjects(app) {
  const getAssignment = (req, res) => {
    res.json(assignment)
  }

  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title)
  }

  const setAssignmentTitle = (req, res) => {
    const { newTitle } = req.params
    assignment.title = newTitle
    res.json(assignment)
  }

  const setAssignmentScore = (req, res) => {
    const { newScore } = req.params
    const n = parseInt(newScore)
    if (Number.isNaN(n)) return res.status(400).send('Invalid score')
    assignment.score = n
    res.json(assignment)
  }

  const setAssignmentCompleted = (req, res) => {
    const { value } = req.params
    // accept 'true' or 'false' (case-insensitive)
    const v = String(value).toLowerCase() === 'true'
    assignment.completed = v
    res.json(assignment)
  }

  // Module handlers
  const getModule = (req, res) => {
    res.json(moduleObj)
  }

  const getModuleName = (req, res) => {
    res.json(moduleObj.name)
  }

  const setModuleName = (req, res) => {
    const { newName } = req.params
    moduleObj.name = newName
    res.json(moduleObj)
  }

  const setModuleDescription = (req, res) => {
    const { newDescription } = req.params
    moduleObj.description = newDescription
    res.json(moduleObj)
  }

  app.get('/lab5/assignment/title', getAssignmentTitle)
  app.get('/lab5/assignment/title/:newTitle', setAssignmentTitle)
  app.get('/lab5/assignment/score/:newScore', setAssignmentScore)
  app.get('/lab5/assignment/completed/:value', setAssignmentCompleted)
  app.get('/lab5/assignment', getAssignment)

  // module routes
  app.get('/lab5/module', getModule)
  app.get('/lab5/module/name', getModuleName)
  app.get('/lab5/module/name/:newName', setModuleName)
  app.get('/lab5/module/description/:newDescription', setModuleDescription)
}

