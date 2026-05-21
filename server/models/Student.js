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
      required: true
    },

    phone: String,

    course: String,

    semester: Number

  }, {

    timestamps: true
  })

const Student =
  mongoose.model(
    'Student',
    studentSchema
  )

export default Student