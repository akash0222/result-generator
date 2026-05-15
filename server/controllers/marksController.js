import Mark from '../models/Mark.js'

import getAbsoluteGrade
from '../utils/absoluteGrading.js'

import {

  calculateMean,
  calculateSD,
  getRelativeGrade

} from '../utils/relativeGrading.js'

// GET ALL MARKS
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

      // TOTAL
      const total =

        Number(internal) +
        Number(midterm) +
        Number(endterm)

      let grade = ''

      // =========================
      // ABSOLUTE GRADING
      // =========================
      if (
        gradingMode ===
        'absolute'
      ) {

        grade =
          getAbsoluteGrade(
            total
          )
      }

      // =========================
      // RELATIVE GRADING
      // SUBJECT-WISE
      // =========================
      else {

        // SAME SUBJECT MARKS
        const subjectMarks =
          await Mark.find({

            subject
          })

        // GET TOTALS
        const totals =
          subjectMarks.map(
            (m) => m.total
          )

        // ADD CURRENT TOTAL
        totals.push(total)

        // MEAN
        const mean =
          calculateMean(
            totals
          )

        // STANDARD DEVIATION
        const sd =
          calculateSD(
            totals,
            mean
          )

        // RELATIVE GRADE
        grade =
          getRelativeGrade(
            total,
            mean,
            sd
          )
      }

      // CREATE MARK ENTRY
      const mark =
        new Mark({

          roll,
          subject,
          internal,
          midterm,
          endterm,
          total,
          grade,
          gradingMode
        })

      // SAVE
      const savedMark =
        await mark.save()

      res.status(201).json(
        savedMark
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