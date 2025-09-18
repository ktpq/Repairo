const express = require('express')
const app = express()
const port = 8000

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

// use section
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

// router section
const userRouter = require('./routers/userRouter')
app.use("/api", userRouter)

const authRouter = require('./routers/authRouter')
app.use("/api", authRouter)

const dormRouter = require('./routers/dormRouter')
app.use("/api", dormRouter)

const requestRouter = require('./routers/requestRouter')
app.use("/api", requestRouter)


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})