import express from 'express'
import passport from 'passport'
import rp from 'request-promise'
import eventCleaner from '../utils/eventCleaner'
import UserSchema from '../schemas/UserSchema'
const router = express.Router()

router
  .get('/events/:username', async (req, res) => {
    try {
      const { username } = req.params
      const user = await UserSchema.findOne(
        { username: { $regex: username, $options: 'i' } }
      )

      if (!user) {
        const events = await rp(`https://api.github.com/users/${ username }/events`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${ process.env.GITHUB_ACCESS_TOKEN }`,
            'User-Agent': 'NorthernTwig'
          },
          json: true
        })

        const organizedEvents = events.map(event => {
          const eventObject = eventCleaner(event)

          return  {
            id: event.id,
            type: event.type,
            repo: event.repo.name,
            events: eventObject
          }
        })

        const experience = organizedEvents.reduce((exp, event) => exp += event.events.experience, 0)
        
        return res.json({
          organizedEvents,
          experience
        })
      }

      const organizedEvents = user.events.map(event => {
        return  {
          id: event.id,
          events: event.event
        }
      })

      console.log(organizedEvents)

      res.json({
        organizedEvents
      })

    } catch(error) {
      console.log(error)
    }
  })

export default router
