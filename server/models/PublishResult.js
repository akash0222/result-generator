import mongoose from 'mongoose'

const publishSchema =
  new mongoose.Schema({

    semester: {

      type: Number,

      required: true,

      unique: true
    },

    published: {

      type: Boolean,

      default: false
    }

  }, {

    timestamps: true
  })

const Publish =
  mongoose.model(

    'Publish',

    publishSchema
  )

export default Publish