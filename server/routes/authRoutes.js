import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/login', async (req, res) => {

  try {

    const {
      username,
      password
    } = req.body

    // ADMIN LOGIN
    if (

      username === 'admin' &&
      password === 'admin123'

    ) {

      const token = jwt.sign(

        {
          username: 'admin',
          role: 'admin'
        },

        process.env.JWT_SECRET,

        {
          expiresIn: '30d'
        }
      )

      return res.status(200).json({

        token,
        role: 'admin'
      })
    }

    return res.status(401).json({

      message: 'Invalid credentials'
    })

  } catch (error) {

    console.log(error)

    return res.status(500).json({

      message: 'Server Error'
    })
  }
})

export default router