import mongoose from 'mongoose'

const schoolProfileSchema = new mongoose.Schema({

  schoolName: String,
  schoolCode: String,
  affiliationNo: String,
  registrationNo: String,

  address: String,
  city: String,
  state: String,
  country: String,
  pincode: String,

  phone: String,
  mobile: String,
  email: String,
  website: String,

  principalName: String,
  vicePrincipal: String,
  administrator: String

}, {
  timestamps: true
})

export default mongoose.model(
  'SchoolProfile',
  schoolProfileSchema
)