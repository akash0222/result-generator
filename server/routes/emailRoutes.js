import express from 'express'

import {

  sendResultEmail

} from '../controllers/emailController.js'

// OPTIONAL SECURITY
// import {
//   protect,
//   adminOnly
// } from '../middleware/authMiddleware.js'

const router =
  express.Router()

// ======================
// SEND RESULT EMAIL
// ======================

router.post(

  '/send-result',

  // protect,
  // adminOnly,

  sendResultEmail
)

export default router