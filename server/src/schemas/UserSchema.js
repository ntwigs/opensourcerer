import mongoose from 'mongoose'

export default mongoose.model('UserSchema', mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
    default: 0,
  },
  level: {
    type: Number,
    required: true,
    default: 1,
  },
  titles: {
    type: Array,
    required: true,
    default: ['Noob'],
  },
  hats: {
    type: Array,
    default: [],
  },
  trophies: {
    type: Array,
    default: [],
  },
  events: {
    type: Array,
    required: true,
    default: [],
  },
  accessToken: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
}))
