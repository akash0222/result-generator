import Student from '../models/Student.js'

import bcrypt from 'bcryptjs'

// ======================
// GET STUDENTS
// ======================

export const getStudents =
  async (req, res) => {

    try {

      const students =
        await Student.find()

      res.json(students)

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      })
    }
  }

// ======================
// ADD STUDENT
// ======================

export const addStudent =
  async (req, res) => {

    try {

      const {

        name,
        roll,
        password,
        email,
        phone,
        course,
        semester

      } = req.body

      // CHECK EXISTING
      const existingStudent =
        await Student.findOne({
          roll
        })

      if (existingStudent) {

        return res.status(400).json({

          message:
            'Roll number already exists'
        })
      }

      // HASH PASSWORD
      const hashedPassword =
        await bcrypt.hash(

          password || '123456',

          10
        )

      // CREATE
      const student =
        await Student.create({

          name,

          roll,

          password:
            hashedPassword,

          email,

          phone,

          course,

          semester
        })

      res.status(201).json(
        student
      )

    } catch (error) {

      res.status(500).json({

        message:
          error.message
      })
    }
  }

// ======================
// UPDATE STUDENT
// ======================

export const updateStudent =
  async (req, res) => {

    try {

      const student =
        await Student.findById(
          req.params.id
        )

      if (!student) {

        return res.status(404).json({

          message:
            'Student not found'
        })
      }

      student.name =
        req.body.name ||
        student.name

      student.roll =
        req.body.roll ||
        student.roll

      student.email =
        req.body.email ||
        student.email

      student.phone =
        req.body.phone ||
        student.phone

      student.course =
        req.body.course ||
        student.course

      student.semester =
        req.body.semester ||
        student.semester

      // OPTIONAL PASSWORD UPDATE
      if (req.body.password) {

        student.password =
          await bcrypt.hash(

            req.body.password,

            10
          )
      }

      const updatedStudent =
        await student.save()

      res.json(updatedStudent)

    } catch (error) {

      res.status(500).json({

        message:
          error.message
      })
    }
  }

// ======================
// DELETE STUDENT
// ======================

export const deleteStudent =
  async (req, res) => {

    try {

      const student =
        await Student.findById(
          req.params.id
        )

      if (!student) {

        return res.status(404).json({

          message:
            'Student not found'
        })
      }

      await student.deleteOne()

      res.json({

        message:
          'Student deleted'
      })

    } catch (error) {

      res.status(500).json({

        message:
          error.message
      })
    }
  }