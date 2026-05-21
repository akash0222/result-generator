import express from 'express'

import {

  getPublishStatus,
  publishResult,
  unpublishResult

} from '../controllers/publishController.js'

// OPTIONAL
// import {
//   protect,
//   adminOnly
// } from '../middleware/authMiddleware.js'

const router =
  express.Router()

// ======================
// GET PUBLISH STATUS
// ======================

router.get(

  '/',

  getPublishStatus
)

// ======================
// PUBLISH RESULTS
// ======================

router.post(

  '/publish',

  // protect,
  // adminOnly,

  publishResult
)

// ======================
// UNPUBLISH RESULTS
// ======================

router.post(

  '/unpublish',

  // protect,
  // adminOnly,

  unpublishResult
)

export default router