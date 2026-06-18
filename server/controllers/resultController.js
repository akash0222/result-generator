import Result from '../models/Result.js'
import Mark from '../models/Mark.js'
import Subject from '../models/Subject.js'

// GRADE POINTS
const getGradePoint = (grade) => {

  switch (grade) {

    case 'A+':
      return 10

    case 'A':
      return 9

    case 'B+':
      return 8

    case 'B':
      return 7

    case 'C':
      return 6

    default:
      return 0
  }
}

// GENERATE RESULT
export const generateResult =
  async (req, res) => {

    try {

      const {
        roll,
        semester
      } = req.body

      // GET STUDENT MARKS
      const marks =
        await Mark.find({ roll })

      if (marks.length === 0) {

        return res.status(404).json({
          message: 'No marks found'
        })
      }

      let totalCredits = 0
      let totalPoints = 0

      // LOOP MARKS
      for (const mark of marks) {

        const subject =
          await Subject.findOne({
            code: mark.subject
          })

        const credits =
          subject?.credits || 0

        const gradePoint =
          getGradePoint(mark.grade)

        totalCredits += credits

        totalPoints +=
          credits * gradePoint
      }

      const sgpa =
        totalCredits > 0
          ? (
              totalPoints /
              totalCredits
            ).toFixed(2)
          : 0

      // SAVE RESULT
      const result =
        await Result.create({

          roll,
          semester,
          sgpa,
          cgpa: sgpa
        })

      res.status(201).json(result)

    } catch (error) {

      res.status(500).json({
        message: error.message
      })
    }
  }

// GET RESULTS
export const getResults =
  async (req, res) => {

    try {

      const results =
        await Result.find()

      res.json(results)

    } catch (error) {

      res.status(500).json({
        message: error.message
      })
    }
  }