import express from 'express'

import upload from '../controllers/upload.js'
import { getTemplates, downloadAdd, searchTemp } from '../controllers/templates.js'

const router = express.Router()

router.get('/gettemps', getTemplates)
router.post('/create', upload)
router.put("/downloadadd/:id", downloadAdd)
router.get("/search/:search", searchTemp)

export default router

