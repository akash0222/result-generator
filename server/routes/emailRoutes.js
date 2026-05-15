import express from 'express'

import {
  sendResultEmail
} from '../controllers/emailController.js'

const router =
  express.Router()

router.post(
  '/',
  sendResultEmail
)

export default router