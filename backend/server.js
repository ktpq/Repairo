const express = require('express')
const app = express()
const port = 8000

const morgan = require('morgan');
const bodyParser = require('body-parser');

// use section
app.use(morgan('dev'))
app.use(bodyParser.json())

// router section
const userRouter = require('./routers/userRouter')
app.use("/api", userRouter)


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})