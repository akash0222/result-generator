import Faculty
from '../models/Faculty.js'

import bcrypt
from 'bcryptjs'

import jwt
from 'jsonwebtoken'

// REGISTER FACULTY
export const registerFaculty =
  async (req, res) => {

    try {

      const {

        name,
        email,
        password,
        subject

      } = req.body

      // CHECK EXISTS
      const exists =
        await Faculty.findOne({

          email
        })

      if (exists) {

        return res.status(400).json({

          message:
            'Faculty already exists'
        })
      }

      // HASH PASSWORD
      const hashedPassword =
        await bcrypt.hash(

          password,
          10
        )

      // CREATE FACULTY
      const faculty =
        await Faculty.create({

          name,
          email,

          password:
            hashedPassword,

          subject,

          role:
            'faculty'
        })

      res.status(201).json({

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

      res.status(500).json({

        message:
          error.message
      })
    }
  }

// LOGIN FACULTY
export const loginFaculty =
  async (req, res) => {

    try {

      const {

        email,
        password

      } = req.body

      // FIND FACULTY
      const faculty =
        await Faculty.findOne({

          email
        })

      if (!faculty) {

        return res.status(400).json({

          message:
            'Invalid credentials'
        })
      }

      // CHECK PASSWORD
      const isMatch =
        await bcrypt.compare(

          password,
          faculty.password
        )

      if (!isMatch) {

        return res.status(400).json({

          message:
            'Invalid credentials'
        })
      }

      // JWT TOKEN
      const token =
        jwt.sign(

          {

            id:
              faculty._id,

            role:
              faculty.role
          },

          'secret123',

          {

            expiresIn:
              '7d'
          }
        )

      // RESPONSE
      res.json({

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

      res.status(500).json({

        message:
          error.message
      })
    }
  }