import AcademicSession from '../models/AcademicSession.js'

// GET ALL

export const getSessions = async (req, res) => {
  try {
    const sessions =
      await AcademicSession.find().sort({
        startDate: -1,
      })

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

    const exists =
      await AcademicSession.findOne({
        sessionName,
      })

    if (exists) {
      return res.status(400).json({
        message:
          'Session already exists',
      })
    }

    const count =
      await AcademicSession.countDocuments()

    const session =
      await AcademicSession.create({
        sessionName,
        startDate,
        endDate,

        isActive: count === 0,
      })

    res.status(201).json(session)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// SET ACTIVE

export const setActiveSession = async (
  req,
  res
) => {
  try {
    await AcademicSession.updateMany(
      {},
      {
        isActive: false,
      }
    )

    const session =
      await AcademicSession.findByIdAndUpdate(
        req.params.id,
        {
          isActive: true,
        },
        {
          new: true,
        }
      )

    res.json(session)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// DELETE

export const deleteSession = async (
  req,
  res
) => {
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