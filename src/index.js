import express from 'express'
import mainRoute from './routes/mainRoute'

const app = express()
const PORT = 3000

app.use(mainRoute)

app.listen(PORT, () => {
    console.log(`Up and running on port : ${ PORT }`)
})
