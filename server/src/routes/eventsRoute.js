import express from 'express'
import passport from 'passport'
import UserSchema from '../schemas/UserSchema'
const router = express.Router()

router
  .get('/events/:username', async (req, res) => {
    try {
      const { username } = req.params
      const user = await UserSchema.findOne(
        { username: { $regex: username, $options: 'i' } }
      )
      const organizedEvents = user.events.map(event => {
        return  {
          id: event.id,
          type: event.type,
          repo: event.repo
        }
      })

      res.json({
        organizedEvents
      })

    } catch(error) {
      console.log(error)
    }
  })

export default router
