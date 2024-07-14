import express from 'express'
import userRouter from './Routes/User.js'

const app = express()
const PORT = process.env.PORT || 8000

app.get('/', (req,res)=>{
    res.send("Hello world")
})

app.use('/api/v1/user', userRouter)

app.listen(PORT, ()=>{
    console.log("Server started at port "+ PORT);
})