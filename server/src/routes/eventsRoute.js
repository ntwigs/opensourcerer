import express from 'express'
import UserSchema from '../schemas/UserSchema'
import getPublicUserFeed from './lib/getPublicUserFeed'

const router = express.Router()


router
  .get('/events/:username', async (req, res) => {
    const { username } = req.params
    const user = await UserSchema.findOne(
      { username: { $regex: username, $options: 'i' } },
    ).catch(error => console.log(error))

    if (!user) {
      const unregisteredUserObject = await getPublicUserFeed(req)
      return res.json(unregisteredUserObject)
    }

    const organizedEvents = user.events.map(event => ({
      id: event.id,
      events: event.events,
    }))

    const { avatar: avatarUrl, level, experience, titles } = user

    return res.json({
      organizedEvents,
      experience,
      level,
      avatarUrl,
      titles,
    })
  })

export default router
