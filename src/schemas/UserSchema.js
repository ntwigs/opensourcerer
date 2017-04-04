import mongoose from 'mongoose'

export default mongoose.model('UserSchema', mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  accessToken: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
}))