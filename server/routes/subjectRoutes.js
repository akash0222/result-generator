import express from 'express'

import {

  getSubjects,
  addSubject,
  deleteSubject

} from '../controllers/subjectController.js'

const router =
  express.Router()

router.get(
  '/',
  getSubjects
)

router.post(
  '/',
  addSubject
)

router.delete(
  '/:id',
  deleteSubject
)

export default router