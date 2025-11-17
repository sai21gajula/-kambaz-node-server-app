export default function QueryParameters(app) {
  const calculator = (req, res) => {
    const { a, b, operation } = req.query

    const na = parseInt(a)
    const nb = parseInt(b)
    let result

    switch (operation) {
      case 'add':
        result = na + nb
        break
      case 'subtract':
        result = na - nb
        break
      case 'multiply':
        result = na * nb
        break
      case 'divide':
        if (nb === 0) {
          return res.status(400).send('Cannot divide by zero')
        }
        result = na / nb
        break
      default:
        return res.status(400).send('Invalid operation')
    }
    res.send(result.toString())
  }

  app.get('/lab5/calculator', calculator)
}
