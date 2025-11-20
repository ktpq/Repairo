const express = require('express')
const path = require('path')
const app = express()
const port = 8000

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// use section
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:3000", // ที่มาของ frontend
  credentials: true, // อนุญาตให้ส่ง cookie
}))

// router section
const userRouter = require('./routers/userRouter')
app.use("/api", userRouter)

const authRouter = require('./routers/authRouter')
app.use("/api", authRouter)

const dormRouter = require('./routers/dormRouter')
app.use("/api", dormRouter)

const requestRouter = require('./routers/requestRouter')
app.use("/api", requestRouter)

const roomRouter = require('./routers/roomRouter');
const { authenticateToken } = require('./middlewares/middleware');
app.use("/api", roomRouter)

// app.post('/api/upload', uploadS3.single('image_url'), (req, res) => {
//   try{
//     res.send("upload")
//   } catch (error){
//     res.send(error.message)
//   }
// })


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})