import express from 'express'

const app = express()
const PORT = process.env.PORT || 8000

app.get('/', (req,res)=>{
    res.send("Hello world")
})

app.listen(PORT, ()=>{
    console.log("Server started at port "+ PORT);
})