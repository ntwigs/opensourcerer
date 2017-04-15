import express from 'express'
import passport from 'passport'
import rp from 'request-promise'
import UserSchema from '../schemas/UserSchema'
const router = express.Router()

router
  .get('/events', async (req, res) => {
    try {
      
      const { username } = req.body
      const user = UserSchema.findOne({ username })

      const organizedEvents = user.events.map(event => {
        return  {
          id: event.id,
          type: event.type,
          repo: event.repo.name
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
