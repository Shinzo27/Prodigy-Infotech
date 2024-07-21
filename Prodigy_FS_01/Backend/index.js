import express from 'express'
import mongoose from 'mongoose'
import userRouter from './Routes/User.js'
import { config } from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import { errorMiddleware } from './Middlewares/ErrorHandler.js'

const app = express()
const PORT = process.env.PORT || 8000
config({path: './config/.env'})

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("MongoDb Connected"))

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
)

app.get('/', (req,res)=>{
    res.send("Hello world")
})

app.use('/api/v1/user', userRouter)

app.use(errorMiddleware)

app.listen(PORT, ()=>{
    console.log("Server started at port "+ PORT);
})