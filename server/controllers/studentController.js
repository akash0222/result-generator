import Student from '../models/Student.js'

// GET ALL STUDENTS
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

// ADD STUDENT
export const addStudent =
  async (req, res) => {

    try {

      const {
        name,
        roll,
        course
      } = req.body

      // CHECK DUPLICATE
      const exists =
        await Student.findOne({ roll })

      if (exists) {

        return res.status(400).json({
          message:
            'Roll number already exists'
        })
      }

      // CREATE STUDENT
      const student =
        new Student({
          name,
          roll,
          course
        })

      const savedStudent =
        await student.save()

      res.status(201).json(
        savedStudent
      )

    } catch (error) {

      res.status(500).json({
        message: error.message
      })
    }
  }

// UPDATE STUDENT
export const updateStudent =
  async (req, res) => {

    try {

      const {
        name,
        roll,
        course
      } = req.body

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

      // UPDATE DATA
      student.name = name
      student.roll = roll
      student.course = course

      const updatedStudent =
        await student.save()

      res.json(updatedStudent)

    } catch (error) {

      res.status(500).json({
        message: error.message
      })
    }
  }

// DELETE STUDENT
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