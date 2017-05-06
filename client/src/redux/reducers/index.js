import { combineReducers } from 'redux'
import user from './user'
import inventory from './inventory'
import avatarCanvas from './inventory'

export default combineReducers({
  user,
  inventory,
  avatarCanvas
})
