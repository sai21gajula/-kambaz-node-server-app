import express from 'express'
import Hello from './Hello.js'
import Lab5 from './app/Labs/Lab5/index.js'

const app = express()
const PORT = process.env.PORT || 4000

Hello(app)
Lab5(app)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))