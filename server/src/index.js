import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import session from 'express-session'
import mongoDB from './utils/mongoDB'
import passport from 'passport'
import bodyParser from 'body-parser'
import cors from 'cors'
import jwt from 'express-jwt'
import mainRoute from './routes/mainRoute'
import authRoute from './routes/authRoute'
import userRoute from './routes/userRoute'
import eventsRoute from './routes/eventsRoute'
import path from 'path'

const app = express()
const PORT = 3001

app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

app.use(jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false
}))

app.use(authRoute)
app.use(userRoute)
app.use(mainRoute)
app.use(eventsRoute)
app.use('/static', express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
    console.log(`Up and running on port : ${ PORT }`)
})
