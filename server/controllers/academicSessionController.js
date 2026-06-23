import AcademicSession from '../models/AcademicSession.js'

// GET ALL

export const getSessions = async (
  req,
  res
) => {
  try {
    const sessions =
      await AcademicSession.find()

    res.json(sessions)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// CREATE

export const createSession = async (
  req,
  res
) => {
  try {
    const {
      sessionName,
      startDate,
      endDate,
    } = req.body

    const session =
      await AcademicSession.create({
        sessionName,
        startDate,
        endDate,
      })

    res.status(201).json(session)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// DELETE

export const deleteSession =
  async (req, res) => {
    try {
      await AcademicSession.findByIdAndDelete(
        req.params.id
      )

      res.json({
        message:
          'Session deleted successfully',
      })
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }