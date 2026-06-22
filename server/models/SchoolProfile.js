import mongoose from 'mongoose'

const schoolProfileSchema = new mongoose.Schema({

  schoolName: String,
  schoolCode: String,
  affiliationNo: String,

  principalName: String,
  vicePrincipal: String,

  email: String,
  phone: String,
  website: String,

  address: String,
  city: String,
  state: String,
  country: String,
  pincode: String,

  logo: String,

}, {
  timestamps: true
})

export default mongoose.model(
  'SchoolProfile',
  schoolProfileSchema
)