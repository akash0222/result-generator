import mongoose from 'mongoose'

const attendanceSchema =
new mongoose.Schema({

  studentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Student'
  },

  date:{
    type:Date,
    default:Date.now
  },

  status:{
    type:String,
    enum:['Present','Absent']
  }

})

export default mongoose.model(
  'Attendance',
  attendanceSchema
)