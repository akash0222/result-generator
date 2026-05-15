import express from 'express'

import {

  getPublishStatus,
  publishResult,
  unpublishResult

} from '../controllers/publishController.js'

const router =
  express.Router()

router.get(
  '/',
  getPublishStatus
)

router.post(
  '/publish',
  publishResult
)

router.post(
  '/unpublish',
  unpublishResult
)

export default router