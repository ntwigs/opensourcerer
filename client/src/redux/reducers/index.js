import { combineReducers } from 'redux'
import user from './user'
import inventory from './inventory'
import avatarCanvas from './avatarCanvas'
import leaderboard from './leaderboard'

export default combineReducers({
  user,
  inventory,
  avatarCanvas,
  leaderboard,
})
