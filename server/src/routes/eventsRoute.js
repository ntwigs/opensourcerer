import express from 'express'
import passport from 'passport'
import rp from 'request-promise'
import eventCleaner from '../utils/eventCleaner'
import UserSchema from '../schemas/UserSchema'
import getPublicUserFeed from './lib/getPublicUserFeed'
import getUserToken from './lib/getUserToken'
const router = express.Router()

router
  .get('/events/:username', async (req, res) => {
    try {
      const { username } = req.params
      const user = await UserSchema.findOne(
        { username: { $regex: username, $options: 'i' } }
      )

      if (!user) {
        const unregisteredUserObject = await getPublicUserFeed(req)
        return res.json(unregisteredUserObject)
      }

      const organizedEvents = user.events.map(event => ({
          id: event.id,
          events: event.events,
      }))

      const { avatar: avatarUrl, level, experience, titles } = user

      res.json({
        organizedEvents,
        experience,
        level,
        avatarUrl,
        titles
      })
    } catch(error) {
      console.log(error)
    }
  })

export default router
