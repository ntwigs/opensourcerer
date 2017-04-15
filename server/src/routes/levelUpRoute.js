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
        { username: { $regex: username, $options: 'i' } }
      )

      if (!user) {
        const organizedEvents = events.map(event => {
          return  {
            id: event.id,
            type: event.type,
            repo: event.repo.name
          }
        })

        return res.json({
          events: [...organizedEvents]
        })
      }

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

      const experience = levelCalculator(user.experience, newEvents.length)

      const updatedUser = await UserSchema.findOneAndUpdate({ username }, {
        events: [...newEvents, ...user.events],
        experience
      })

      res.json({
        newEvents,
        experience
      })

    } catch(error) {
      console.log(error)
    }
  })


export default router
