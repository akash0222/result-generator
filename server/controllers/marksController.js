import Mark from '../models/Mark.js'

import getAbsoluteGrade
from '../utils/absoluteGrading.js'

import {

  calculateMean,
  calculateSD,
  getRelativeGrade

} from '../utils/relativeGrading.js'

// GET MARKS
export const getMarks =
  async (req, res) => {

    try {

      const marks =
        await Mark.find()

      res.json(marks)

    } catch (error) {

      res.status(500).json({

        message:
          error.message
      })
    }
  }

// ADD MARKS
export const addMarks =
  async (req, res) => {

    try {

      const {

        roll,
        subject,
        internal,
        midterm,
        endterm,
        gradingMode

      } = req.body

      // CHECK EXISTING
      const exists =
        await Mark.findOne({

          roll,
          subject
        })

      if (exists) {

        return res.status(400).json({

          message:
            'Marks already added'
        })
      }

      const total =

        Number(internal) +
        Number(midterm) +
        Number(endterm)

      let grade = ''

      // ABSOLUTE
      if (
        gradingMode ===
        'absolute'
      ) {

        grade =
          getAbsoluteGrade(
            total
          )
      }

      // RELATIVE
      else {

        const subjectMarks =
          await Mark.find({
            subject
          })

        const totals =
          subjectMarks.map(
            (m) => m.total
          )

        totals.push(total)

        const mean =
          calculateMean(
            totals
          )

        const sd =
          calculateSD(
            totals,
            mean
          )

        grade =
          getRelativeGrade(

            total,
            mean,
            sd
          )
      }

      // SAVE
      const mark =
        await Mark.create({

          roll,
          subject,
          internal,
          midterm,
          endterm,
          total,
          grade,
          gradingMode
        })

      res.status(201).json(
        mark
      )

    } catch (error) {

      res.status(500).json({

        message:
          error.message
      })
    }
  }

// DELETE MARK
export const deleteMark =
  async (req, res) => {

    try {

      const mark =
        await Mark.findById(
          req.params.id
        )

      if (!mark) {

        return res.status(404).json({

          message:
            'Mark not found'
        })
      }

      await mark.deleteOne()

      res.json({

        message:
          'Mark deleted'
      })

    } catch (error) {

      res.status(500).json({

        message:
          error.message
      })
    }
  }