import express from 'express'

import upload from '../controllers/upload.js'
import { getTemplates, getFile, downloadAdd, searchTemp } from '../controllers/templates.js'

const router = express.Router()

router.get('/gettemps', getTemplates)
router.post('/create', upload)
router.get('/file/:id', getFile)
router.put("/downloadadd/:id", downloadAdd)
router.get("/search/:search", searchTemp)

export default router

