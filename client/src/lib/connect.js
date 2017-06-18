import io from 'socket.io-client'
import store from '../redux/store'
import { updateUserData, userLevelup } from '../redux/actions/user'

const socket = io('http://localhost:3001/')

export const socketConnection = () => {
  socket.on('connect', () => console.log('connected'))
  socket.on('joinedRoom', () => console.log('You joined a room'))
  socket.on('events', events => store.dispatch(userLevelup(events)))
  socket.on('data', data => store.dispatch(updateUserData(data)))
}

export const joinRoom = () => socket.emit('join', 'Northerntwig')
export const leaveRoom = () => socket.emit('leave')
