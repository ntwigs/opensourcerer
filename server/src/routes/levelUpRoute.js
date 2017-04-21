import express from 'express'
import passport from 'passport'
import rp from 'request-promise'
import UserSchema from '../schemas/UserSchema'
import eventCleaner from '../utils/eventCleaner'
import levelCheck from '../utils/levelCheck'
import fetchNewEvents from './lib/fetchNewEvents'
const router = express.Router()

router
  .post('/levelup', async (req, res) => {
    try {
      const { username } = req.body

      const user = await UserSchema.findOne(
        { username: { $regex: username, $options: 'i' } }
      )

      if (!user) {
        return res.json({
          events: []
        })
      }

      const newEvents = await fetchNewEvents(username)
      const updatedUserObject = {
        events: [...newEvents.newEvents, ...user.events],
        experience,
        level
      }

      const updatedUser = await UserSchema.findOneAndUpdate({
        username: user.username
      }, updatedUserObject)

      res.json(updatedUserObject)
    } catch(error) {
      console.log(error)
    }
  })


export default router
