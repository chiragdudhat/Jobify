import express from "express"
const app = express()
dotenv.config()
import dotenv from 'dotenv'

//db
import connectDB from "./db/connect.js"

//routers
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'
// Middleware 
import errorHandlerMiddleware from "./middlewares/error-handler.js"
import notFoundMiddleware from "./middlewares/not-found.js"



// const PORT = process.env.PORT || 5000;
const port =  5000;

app.use(express.json() )
app.get("/", (req, res)=>{
  
    res.send("Hello World")
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const start = async ()=> {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, (req, res)=>{
            console.log(`Server running at port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()