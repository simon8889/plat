import express from 'express'
import logger from "morgan"
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from "mongoose"
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import indexRouter from './routes/index.js' 
import templatesRoutes from "./routes/templates.js"

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config()
const app = express()
const PORT = process.env.PORT || 9000;

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "./templates/")));
app.use(cors())

app.use('/', indexRouter)
app.use('/templates', templatesRoutes)

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => {
        console.log("db connected");
        app.listen(PORT, () => console.log(`ready in port ${PORT}`));
    })
    .catch(err => console.log(err))
