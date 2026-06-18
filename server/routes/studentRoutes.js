import express from 'express'

import {

  getStudents,
  addStudent,
  updateStudent,
  deleteStudent

} from '../controllers/studentController.js'

const router =
  express.Router()

// GET
router.get(
  '/',
  getStudents
)

// ADD
router.post(
  '/',
  addStudent
)

// UPDATE
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