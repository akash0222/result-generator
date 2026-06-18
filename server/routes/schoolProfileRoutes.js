import express from 'express'

import {
  getSchoolProfile,
  saveSchoolProfile
}
from '../controllers/schoolProfileController.js'

const router =
  express.Router()

router.get(
  '/',
  getSchoolProfile
)

router.post(
  '/',
  saveSchoolProfile
)

export default router