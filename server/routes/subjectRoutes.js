import express from 'express'

import {

  getSubjects,
  addSubject,
  deleteSubject

} from '../controllers/subjectController.js'

import {

  protect,
  adminOnly

} from '../middleware/authMiddleware.js'

const router =
  express.Router()

// ======================
// GET SUBJECTS
// ======================
router.get(

  '/',

  protect,

  getSubjects
)

// ======================
// ADD SUBJECT
// ======================
router.post(

  '/',

  protect,

  adminOnly,

  addSubject
)

// ======================
// DELETE SUBJECT
// ======================
router.delete(

  '/:id',

  protect,

  adminOnly,

  deleteSubject
)

export default router