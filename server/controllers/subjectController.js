import Subject from '../models/Subject.js'

// GET SUBJECTS
export const getSubjects =
  async (req, res) => {

    try {

      const subjects =
        await Subject.find()

      res.json(subjects)

    } catch (error) {

      res.status(500).json({
        message: error.message
      })
    }
  }

// ADD SUBJECT
export const addSubject =
  async (req, res) => {

    try {

      const {
        name,
        code,
        credits
      } = req.body

      const subject =
        new Subject({
          name,
          code,
          credits
        })

      const savedSubject =
        await subject.save()

      res.status(201).json(
        savedSubject
      )

    } catch (error) {

      res.status(500).json({
        message: error.message
      })
    }
  }

// DELETE SUBJECT
export const deleteSubject =
  async (req, res) => {

    try {

      await Subject.findByIdAndDelete(
        req.params.id
      )

      res.json({
        message:
          'Subject deleted'
      })

    } catch (error) {

      res.status(500).json({
        message: error.message
      })
    }
  }