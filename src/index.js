import express from 'express'
const app = express()
const PORT = 3000

app.get('/', () => {
    res.send('It works')
})

app.listen(PORT, () => {
    console.log(`Up and running on port : ${ PORT }`)
})
