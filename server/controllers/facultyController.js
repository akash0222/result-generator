import Faculty
from '../models/Faculty.js'

import bcrypt
from 'bcryptjs'

import jwt
from 'jsonwebtoken'

// ======================
// REGISTER FACULTY
// ======================

export const registerFaculty =
  async (req, res) => {

    try {

      const {

        name,
        email,
        password,
        subject,
        role

      } = req.body

      // ======================
      // VALIDATION
      // ======================

      if (

        !name ||
        !email ||
        !password ||
        !subject

      ) {

        return res.status(400).json({

          success: false,

          message:
            'Please fill all fields'
        })
      }

      // ======================
      // CHECK EXISTING
      // ======================

      const exists =
        await Faculty.findOne({

          email:
            email.toLowerCase()
        })

      if (exists) {

        return res.status(400).json({

          success: false,

          message:
            'Faculty already exists'
        })
      }

      // ======================
      // HASH PASSWORD
      // ======================

      const hashedPassword =
        await bcrypt.hash(

          password,

          10
        )

      // ======================
      // CREATE FACULTY
      // ======================

      const faculty =
        await Faculty.create({

          name,

          email:
            email.toLowerCase(),

          password:
            hashedPassword,

          subject,

          role:
            role || 'faculty'
        })

      // ======================
      // RESPONSE
      // ======================

      res.status(201).json({

        success: true,

        message:
          'Faculty registered successfully',

        faculty: {

          id:
            faculty._id,

          name:
            faculty.name,

          email:
            faculty.email,

          subject:
            faculty.subject,

          role:
            faculty.role
        }
      })

    } catch (error) {

      console.log(error)

      res.status(500).json({

        success: false,

        message:
          error.message
      })
    }
  }

// ======================
// LOGIN FACULTY
// ======================

export const loginFaculty =
  async (req, res) => {

    try {

      const {

        email,
        password

      } = req.body

      // ======================
      // VALIDATION
      // ======================

      if (

        !email ||
        !password

      ) {

        return res.status(400).json({

          success: false,

          message:
            'Email and password required'
        })
      }

      // ======================
      // FIND FACULTY
      // ======================

      const faculty =
        await Faculty.findOne({

          email:
            email.toLowerCase()

        }).select('+password')

      if (!faculty) {

        return res.status(400).json({

          success: false,

          message:
            'Invalid credentials'
        })
      }

      // ======================
      // PASSWORD CHECK
      // ======================

      const isMatch =
        await bcrypt.compare(

          password,

          faculty.password
        )

      if (!isMatch) {

        return res.status(400).json({

          success: false,

          message:
            'Invalid credentials'
        })
      }

      // ======================
      // JWT TOKEN
      // ======================

      const token =
        jwt.sign(

          {

            id:
              faculty._id,

            role:
              faculty.role
          },

          process.env.JWT_SECRET,

          {

            expiresIn:
              '7d'
          }
        )

      // ======================
      // RESPONSE
      // ======================

      res.json({

        success: true,

        token,

        faculty: {

          id:
            faculty._id,

          name:
            faculty.name,

          email:
            faculty.email,

          subject:
            faculty.subject,

          role:
            faculty.role
        }
      })

    } catch (error) {

      console.log(error)

      res.status(500).json({

        success: false,

        message:
          error.message
      })
    }
  }