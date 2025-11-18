import express from 'express'
import Hello from './Hello.js'
import Lab5 from './Labs/Lab5/index.js'
import db from './Kambaz/Database/index.js'
import UserRoutes from './Kambaz/Users/routes.js'
import CourseRoutes from './Kambaz/Courses/routes.js'
import ModulesRoutes from './Kambaz/Modules/routes.js'
import AssignmentsRoutes from './Kambaz/Assignments/routes.js'
import EnrollmentsRoutes from './Kambaz/Enrollments/routes.js'
import cors from 'cors'
import session from 'express-session'
import 'dotenv/config'

const app = express()

app.use(
	cors({
		credentials: true,
		origin: process.env.SERVER_ENV === 'development' ? '*' : process.env.CLIENT_URL || 'http://localhost:3000',
	})
)

const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'kambaz',
  resave: false,
  saveUninitialized: false,
}
if (process.env.SERVER_ENV !== 'development') {
  sessionOptions.proxy = true
  sessionOptions.cookie = {
    sameSite: 'none',
    secure: true,
    domain: process.env.SERVER_URL,
  }
}

app.use(session(sessionOptions))

app.use(express.json())

const PORT = process.env.PORT || 4000

Hello(app)
UserRoutes(app, db)
CourseRoutes(app, db)
ModulesRoutes(app, db)
AssignmentsRoutes(app, db)
EnrollmentsRoutes(app, db)
Lab5(app)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))