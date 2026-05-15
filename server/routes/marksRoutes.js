import express from 'express'

import {

  getMarks,
  addMarks,
  deleteMark

} from '../controllers/marksController.js'

import {

  protect,
  facultyOnly

} from '../middleware/authMiddleware.js'

const router =
  express.Router()

// GET MARKS
router.get(
  '/',
  protect,
  getMarks
)

// ADD MARKS
router.post(
  '/',
  protect,
  facultyOnly,
  addMarks
)

// DELETE MARK
router.delete(
  '/:id',
  protect,
  facultyOnly,
  deleteMark
)

export default router