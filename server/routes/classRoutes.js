import express from 'express'

import {
  getClasses,
  createClass,
  deleteClass,
} from '../controllers/classController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, getClasses)

router.post('/', protect, createClass)

router.delete(
  '/:id',
  protect,
  deleteClass
)

export default router