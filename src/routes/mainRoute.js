import express from 'express'
const router = express.Router()

router
    .get('/', (req, res) => {
        res.send('entry')
    })
    .get('/login', (req, res) => {

    })

export default router
