import express from 'express'

import {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent
} from '../controllers/studentController.js'

const router =
  express.Router()

// GET
router.get(
  '/',
  getStudents
)

// POST
router.post(
  '/',
  addStudent
)

// PUT
router.put(
  '/:id',
  updateStudent
)

// DELETE
router.delete(
  '/:id',
  deleteStudent
)

export default router