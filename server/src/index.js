import dotenv from 'dotenv'
import express from 'express'
import passport from 'passport'
import bodyParser from 'body-parser'
import cors from 'cors'
import jwt from 'express-jwt'
import path from 'path'
import socketIO from 'socket.io'
import http from 'http'
import mongoDB from './utils/mongoDB'
import mainRoute from './routes/mainRoute'
import authRoute from './routes/authRoute'
import userRoute from './routes/userRoute'
import eventsRoute from './routes/eventsRoute'
import { socket } from './utils/socket'

const PORT = 3001
const app = express()
const server = http.createServer(app)
const io = socketIO(server)
dotenv.config()

app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

app.use(jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
}))

app.use(authRoute)
app.use(userRoute)
app.use(mainRoute)
app.use(eventsRoute)
app.use('/static', express.static(path.join(__dirname, 'public')))

server.listen(PORT, () => console.log(`Up and running on port : ${ PORT }`))

socket(io)
