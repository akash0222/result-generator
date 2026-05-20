import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/login', (req, res) => {

  const { username, password } =
    req.body

  if (
    username === 'admin' &&
    password === 'admin123'
  ) {

    const token = jwt.sign(

      {
        role: 'admin'
      },

      process.env.JWT_SECRET,

      {
        expiresIn: '30d'
      }
    )

    return res.json({

      token,

      role: 'admin'
    })
  }

  res.status(401).json({

    message: 'Invalid credentials'
  })
})

export default router