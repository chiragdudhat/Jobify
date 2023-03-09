import cors from 'cors'
import express from "express"
const app = express()
dotenv.config()
import dotenv from 'dotenv'
import 'express-async-errors'
import morgan from 'morgan'

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

//db
import connectDB from "./db/connect.js"

//routers
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'
// Middleware 
import errorHandlerMiddleware from "./middlewares/error-handler.js"
import notFoundMiddleware from "./middlewares/not-found.js"
import authenticateUser from './middlewares/auth.js'
import cookieParser from 'cookie-parser'

// const PORT = process.env.PORT || 5000;
const port =  5000;

if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './client/build')))
app.use(express.json() )
app.use(cookieParser())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize()) 

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)


app.get("*", (req, res)=>{
   res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

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