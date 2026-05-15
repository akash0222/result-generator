import mongoose from 'mongoose'

const resultSchema =
  new mongoose.Schema({

    roll: {
      type: String,
      required: true
    },

    semester: {
      type: Number,
      required: true
    },

    sgpa: Number,
    cgpa: Number

  })

const Result =
  mongoose.model(
    'Result',
    resultSchema
  )

export default Result