import mongoose from 'mongoose'

const publishSchema =
  new mongoose.Schema({

    semester: {
      type: Number,
      required: true
    },

    published: {
      type: Boolean,
      default: false
    }

  })

const PublishResult =
  mongoose.model(
    'PublishResult',
    publishSchema
  )

export default PublishResult