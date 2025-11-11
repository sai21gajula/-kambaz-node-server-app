import express from 'express'
import Hello from './Hello.js'
import Lab5 from './Lab5/index.js'
import path from 'path'
import fs from 'fs'

const app = express()
const PORT = process.env.PORT || 4000

Hello(app)
Lab5(app)

// Serve client static files if a built client exists at ./client/build
// This keeps client deployment optional — build your React app into client/build
// then set NODE_ENV=production (or leave unset) and the server will serve it.
const clientBuildPath = path.join(path.resolve(), 'client', 'build')
if (fs.existsSync(clientBuildPath)) {
	app.use(express.static(clientBuildPath))
	app.get('*', (req, res) => {
		res.sendFile(path.join(clientBuildPath, 'index.html'))
	})
}

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))