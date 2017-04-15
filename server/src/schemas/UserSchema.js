import mongoose from 'mongoose'

export default mongoose.model('UserSchema', mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  experience: {
    type: Number,
    required: true,
    default: 0
  },
  events: {
    type: Array,
    required: true,
    default: []  
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
}))