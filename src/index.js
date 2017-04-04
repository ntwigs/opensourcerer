import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoDB from './utils/mongoDB'
import mainRoute from './routes/mainRoute'
import authRoute from './routes/authRoute'

const app = express()
const PORT = 3000

app.use(mainRoute)
app.use(authRoute)

app.listen(PORT, () => {
    console.log(`Up and running on port : ${ PORT }`)
})
