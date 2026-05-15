import Mark from '../models/Mark.js'

// GET MARKS
export const getMarks =
  async (req, res) => {

    try {

      const marks =
        await Mark.find()

      res.json(marks)

    } catch (error) {

      res.status(500).json({
        message: error.message
      })
    }
  }

// ADD MARK
export const addMark =
  async (req, res) => {

    try {

      const {
        roll,
        subject,
        internal,
        midterm,
        endterm
      } = req.body

      const total =
        Number(internal) +
        Number(midterm) +
        Number(endterm)

      let grade = 'F'

      if (total >= 90)
        grade = 'A+'

      else if (total >= 80)
        grade = 'A'

      else if (total >= 70)
        grade = 'B+'

      else if (total >= 60)
        grade = 'B'

      else if (total >= 50)
        grade = 'C'

      const mark =
        await Mark.create({

          roll,
          subject,
          internal,
          midterm,
          endterm,
          total,
          grade
        })

      res.status(201).json(mark)

    } catch (error) {

      res.status(500).json({
        message: error.message
      })
    }
  }