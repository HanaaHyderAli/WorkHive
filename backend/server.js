import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoute.js'
import cookieParser from 'cookie-parser'
import taskRouter from './routes/taskRoute.js'







const app= express()
const port= process.env.PORT || 4000
connectDB()



app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173","https://work-hive-eta.vercel.app"],
    credentials:true,
}
   
))
app.use(cookieParser());


app.use('/api/v1/user',userRouter)
app.use('/api/v1/task',taskRouter)



app.get("/",(req,res)=>{
    res.send("API Working")
})


app.listen(port,()=> console.log('Server started on PORT :'+ port))