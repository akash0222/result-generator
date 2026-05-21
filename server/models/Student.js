import mongoose from 'mongoose'

const studentSchema =
  new mongoose.Schema({

    name: {
      type: String,
      required: true
    },

    roll: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    phone: {
      type: String,
      default: ''
    },

    course: {
      type: String,
      required: true
    },

    semester: {
      type: Number,
      required: true
    }

  }, {

    timestamps: true
  })

const Student =
  mongoose.model(
    'Student',
    studentSchema
  )

export default Student