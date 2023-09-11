const app = require('./app')
const port = 5000

app.listen(port, () => {
  console.log(`API running on port ${port}`)
})