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
        const avatarUrl = events[0].actor.avatar_url

        return res.json({
          organizedEvents,
          experience,
          avatarUrl
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
        avatarUrl
      })

    } catch(error) {
      console.log(error)
    }
  })

export default router
