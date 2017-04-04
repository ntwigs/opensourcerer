import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoDB from './utils/mongoDB'
import mainRoute from './routes/mainRoute'

const app = express()
const PORT = 3000

app.use(mainRoute)

app.listen(PORT, () => {
    console.log(`Up and running on port : ${ PORT }`)
})
