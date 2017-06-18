import express from 'express'
import rp from 'request-promise'

const router = express.Router()


router
  .get('/', async (req, res) => {
    // const result = await rp(`https://api.github.com/users/NorthernTwig/events`, {
    //   method: 'HEAD',
    //   headers: {
    //     'User-Agent': 'Opensourcerer',
    //   },
    //   json: true,
    // })
    res.send('result')
  })

export default router
