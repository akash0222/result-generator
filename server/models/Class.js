import mongoose from 'mongoose'

const classSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
      trim: true,
    },

    section: {
      type: String,
      required: true,
      trim: true,
    },

    classTeacher: {
      type: String,
      default: '',
    },

    strength: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Class', classSchema)