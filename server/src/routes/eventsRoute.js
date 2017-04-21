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
        const organizedEvents = await Promise.all(events.map(async event => {
          const eventObject = await eventCleaner(event)

          return  {
            id: event.id,
            type: event.type,
            repo: event.repo.name,
            events: eventObject
          }
        }))

        const experience = organizedEvents.reduce((exp, event) => exp += event.events.experience, 0)
        const avatarUrl = events[0].actor.avatar_url
        

        return res.json({
          organizedEvents,
          experience,
          avatarUrl,
          level: 0,
          titles: 'Not even a Noob'
        })
      }

      const organizedEvents = user.events.map(event => {
        return  {
          id: event.id,
          events: event.events,
        }
      })

      const avatarUrl = user.avatar

      res.json({
        organizedEvents,
        experience: user.experience,
        level: user.level,
        avatarUrl,
        titles: user.titles
      })

    } catch(error) {
      console.log(error)
    }
  })

export default router
