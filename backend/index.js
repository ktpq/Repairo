const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.json({
    status: "Node is running ! "
  })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})