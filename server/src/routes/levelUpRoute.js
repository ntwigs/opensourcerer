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

      const user = await UserSchema.findOne(
        { username: { $regex: username, $options: 'i' } },
        'username events experience'
      )
      const newEvents = events.filter((event, index) => {

        if (user.events[index].id !== event.id) {
          return  {
            id: event.id,
            type: event.type,
            repo: event.repo.name
          }
        }

        return undefined
      })

      const updatedUser = await UserSchema.findOneAndUpdate({ username }, {
        events: [...newEvents, ...user.events]
      })

      res.json({
        newEvents
      })

    } catch(error) {
      console.log(error)
    }
  })


export default router
