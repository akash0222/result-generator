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

        message:
          error.message
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
        credits,
        semester

      } = req.body

      // CHECK EXISTING
      const exists =
        await Subject.findOne({
          code
        })

      if (exists) {

        return res.status(400).json({

          message:
            'Subject already exists'
        })
      }

      const subject =
        await Subject.create({

          name,
          code,
          credits,
          semester
        })

      res.status(201).json(
        subject
      )

    } catch (error) {

      res.status(500).json({

        message:
          error.message
      })
    }
  }

// DELETE SUBJECT
export const deleteSubject =
  async (req, res) => {

    try {

      const subject =
        await Subject.findById(
          req.params.id
        )

      if (!subject) {

        return res.status(404).json({

          message:
            'Subject not found'
        })
      }

      await subject.deleteOne()

      res.json({

        message:
          'Subject deleted'
      })

    } catch (error) {

      res.status(500).json({

        message:
          error.message
      })
    }
  }