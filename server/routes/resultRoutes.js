import express from 'express'

import {
  generateResult,
  getResults
} from '../controllers/resultController.js'

const router =
  express.Router()

router.get(
  '/',
  getResults
)

router.post(
  '/',
  generateResult
)

export default router