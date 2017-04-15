import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import session from 'express-session'
import mongoDB from './utils/mongoDB'
import passport from 'passport'
import bodyParser from 'body-parser'
import cors from 'cors'
import mainRoute from './routes/mainRoute'
import authRoute from './routes/authRoute'
import userRoute from './routes/userRoute'
import levelUpRoute from './routes/levelUpRoute'

const app = express()
const PORT = 3001

app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

app.use(authRoute)
app.use(userRoute)
app.use(mainRoute)
app.use(levelUpRoute)

app.listen(PORT, () => {
    console.log(`Up and running on port : ${ PORT }`)
})
