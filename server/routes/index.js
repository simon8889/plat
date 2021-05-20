import express from 'express'

import { defaultRoute } from "../controllers/index.js"

const router = express.Router()

router.get('/', defaultRoute)

export default router
