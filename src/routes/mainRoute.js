import express from 'express'
const router = express.Router()

router
    .get('/:jwt', (req, res) => {
        res.send('entry')
    })

export default router
