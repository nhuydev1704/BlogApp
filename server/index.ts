import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

// Routes
app.get('/', (req, res) => {
    res.json("helo blog")
})


// database
import './config/database'


// server port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("server runing: ", PORT)
})