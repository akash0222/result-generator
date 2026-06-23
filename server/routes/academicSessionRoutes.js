import express from 'express'

import {
  getSessions,
  createSession,
  deleteSession,
} from '../controllers/academicSessionController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get(
  '/',
  protect,
  getSessions
)

router.post(
  '/',
  protect,
  createSession
)

router.delete(
  '/:id',
  protect,
  deleteSession
)

export default router