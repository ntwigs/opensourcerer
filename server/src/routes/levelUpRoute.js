import express from 'express'
import passport from 'passport'
import rp from 'request-promise'
import UserSchema from '../schemas/UserSchema'
import levelCalculator from '../utils/levelCalculator'
const router = express.Router()

router
  .post('/levelup', async (req, res) => {
    try {
      const { username } = req.body

      const events = await rp(`https://api.github.com/users/${ username }/events`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${ process.env.GITHUB_ACCESS_TOKEN }`,
          'User-Agent': 'NorthernTwig'
        },
        json: true
      })

      const user = UserSchema.findOne({ username })

      const newEvents = user.events.filter(() => {

      })

      
      res.sendStatus(200)   
    } catch(error) {
      res.send(error)
    }
  })


export default router
