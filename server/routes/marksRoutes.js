import express from 'express'

import {
  getMarks,
  addMark
} from '../controllers/marksController.js'

const router =
  express.Router()

router.get(
  '/',
  getMarks
)

router.post(
  '/',
  addMark
)

export default router