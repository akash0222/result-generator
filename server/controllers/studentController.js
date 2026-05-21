import Student from '../models/Student.js'

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
        message: error.message
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
        email,
        phone,
        course,
        semester
      } = req.body

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

      const student =
        await Student.create({

          name,

          roll,

          email:
            email || '',

          phone:
            phone || '',

          course,

          semester
        })

      res.status(201).json(student)

    } catch (error) {

      res.status(500).json({
        message: error.message
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
        req.body.email || ''

      student.phone =
        req.body.phone || ''

      student.course =
        req.body.course ||
        student.course

      student.semester =
        req.body.semester ||
        student.semester

      const updatedStudent =
        await student.save()

      res.json(updatedStudent)

    } catch (error) {

      res.status(500).json({
        message: error.message
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
        message: error.message
      })
    }
  }