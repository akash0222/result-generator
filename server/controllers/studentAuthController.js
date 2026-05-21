import Student from '../models/Student.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// ======================
// STUDENT LOGIN
// ======================

const studentLogin =
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

        return res.status(401).json({
          message:
            'Invalid roll number'
        })
      }

      // CHECK PASSWORD
      const isMatch =
        await bcrypt.compare(
          password,
          student.password
        )

      if (!isMatch) {

        return res.status(401).json({
          message:
            'Invalid password'
        })
      }

      // CREATE TOKEN
      const token =
        jwt.sign(

          {
            id: student._id,
            role: 'student'
          },

          process.env.JWT_SECRET,

          {
            expiresIn: '7d'
          }
        )

      // RESPONSE
      res.json({

        token,

        student: {

          _id:
            student._id,

          name:
            student.name,

          roll:
            student.roll,

          email:
            student.email,

          course:
            student.course,

          semester:
            student.semester
        }
      })

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      })
    }
  }

export {
  studentLogin
}