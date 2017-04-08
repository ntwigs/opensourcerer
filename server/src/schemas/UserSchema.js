import mongoose from 'mongoose'

export default mongoose.model('UserSchema', mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: Number,
    required: true,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
}))