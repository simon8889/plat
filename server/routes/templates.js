import express from 'express'

import upload from '../controllers/upload.js'

const router = express.Router()

router.post('/create', upload)

export default router

