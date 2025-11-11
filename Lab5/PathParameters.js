export default function PathParameters(app) {
  const add = (req, res) => {
    const { a, b } = req.params
    const sum = parseInt(a) + parseInt(b)
    res.send(sum.toString())
  }

  const subtract = (req, res) => {
    const { a, b } = req.params
    const result = parseInt(a) - parseInt(b)
    res.send(result.toString())
  }

  const multiply = (req, res) => {
    const { a, b } = req.params
    const result = parseInt(a) * parseInt(b)
    res.send(result.toString())
  }

  const divide = (req, res) => {
    const { a, b } = req.params
    const divisor = parseInt(b)
    if (divisor === 0) {
      // avoid sending a raw integer (would be treated as status) — send string message
      return res.status(400).send('Cannot divide by zero')
    }
    const result = parseInt(a) / divisor
    // Use toString to make sure response isn't interpreted as status
    res.send(result.toString())
  }

  app.get('/lab5/add/:a/:b', add)
  app.get('/lab5/subtract/:a/:b', subtract)
  app.get('/lab5/multiply/:a/:b', multiply)
  app.get('/lab5/divide/:a/:b', divide)
}

// Path parameters handlers for Lab5