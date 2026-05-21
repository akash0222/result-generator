import mongoose from 'mongoose'

const facultySchema =
  new mongoose.Schema({

    name: {

      type: String,

      required: true,

      trim: true
    },

    email: {

      type: String,

      required: true,

      unique: true,

      lowercase: true,

      trim: true
    },

    password: {

      type: String,

      required: true,

      select: false
    },

    subject: {

      type: String,

      required: true,

      trim: true
    },

    role: {

      type: String,

      enum: [

        'faculty',
        'admin'
      ],

      default: 'faculty'
    }

  }, {

    timestamps: true
  })

const Faculty =
  mongoose.model(

    'Faculty',

    facultySchema
  )

export default Faculty