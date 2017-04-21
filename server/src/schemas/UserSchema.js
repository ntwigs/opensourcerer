import mongoose from 'mongoose'

export default mongoose.model('UserSchema', mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true,
    default: 0
  },
  level: {
    type: Number,
    required: true,
    default: 1
  },
  titles: {
    type: String,
    required: true,
    default: 'Noob'
  },
  events: {
    type: Array,
    required: true,
    default: []  
  },
  etag: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
}))