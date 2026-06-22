import Class from '../models/Class.js'

// GET ALL

export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find().sort({
      className: 1,
    })

    res.json(classes)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// CREATE

export const createClass = async (req, res) => {
  try {
    const {
      className,
      section,
      classTeacher,
    } = req.body

    const existing = await Class.findOne({
      className,
      section,
    })

    if (existing) {
      return res.status(400).json({
        message:
          'Class already exists',
      })
    }

    const newClass = await Class.create({
      className,
      section,
      classTeacher,
    })

    res.status(201).json(newClass)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// DELETE

export const deleteClass = async (
  req,
  res
) => {
  try {
    await Class.findByIdAndDelete(
      req.params.id
    )

    res.json({
      message:
        'Class deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}