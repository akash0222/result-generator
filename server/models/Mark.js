import mongoose from 'mongoose'

const markSchema =
  new mongoose.Schema({

    roll: {
      type: String,
      required: true
    },

    subject: {
      type: String,
      required: true
    },

    internal: Number,
    midterm: Number,
    endterm: Number,

    total: Number,
    grade: String

  })

const Mark =
  mongoose.model(
    'Mark',
    markSchema
  )

export default Mark