import Student from '../models/Student.js'

import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

export const studentLogin =
  async (req, res) => {

    try {

      const {

        roll,
        password

      } = req.body

      // FIND STUDENT
      const student =
        await Student.findOne({
          roll
        })

      if (!student) {

        return res.status(404).json({

          message:
            'Invalid Roll Number'
        })
      }

      // PASSWORD CHECK
      const isMatch =
        await bcrypt.compare(

          password,

          student.password
        )

      if (!isMatch) {

        return res.status(400).json({

          message:
            'Invalid Password'
        })
      }

      // TOKEN
      const token =
        jwt.sign(

          {
            id:
              student._id
          },

          process.env.JWT_SECRET,

          {
            expiresIn:
              '7d'
          }
        )

      res.json({

        token,

        student
      })

    } catch (error) {

      res.status(500).json({

        message:
          error.message
      })
    }
  }