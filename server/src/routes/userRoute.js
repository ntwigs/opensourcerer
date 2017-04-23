import express from 'express'
import UserSchema from '../schemas/UserSchema'
import fetchNewEvents from './lib/fetchNewEvents'
import jwt from 'express-jwt'
const router = express.Router()

router
  .get('/users/:username', async (req, res) => {
    try {
      const { username } = req.params
      const user = await UserSchema.findOne(
        { username: { $regex: username, $options: 'i' } }
      )
      res.send(user)
    } catch(error) {
      console.log(error)
    }
  })
  .get('/users/:username/levelup', async (req, res) => {
    try {
      const { username } = req.params
      const user = await UserSchema.findOne(
        { username: { $regex: username, $options: 'i' } }
      )

      if (!user) {
        return res.json({
          events: []
        })
      }

      const newEvents = await fetchNewEvents(user, req)

      const updatedUserObject = {
        events: [...newEvents.newEvents, ...user.events],
        experience: newEvents.experience,
        level: newEvents.level
      }

      const updatedUser = await UserSchema.findOneAndUpdate({
        username: user.username
      }, updatedUserObject)

      res.json(newEvents)
    } catch(error) {
      console.log(error)
    }
  })
  .get('/users/:username/inventory', jwt({
    secret: process.env.JWT_SECRET
  }), async (req, res) => {
    const { username } = req.params
    
    if (req.user.username !== username) {
      return res.send(false)
    } 

    const user = await UserSchema.findOne(
      { username: { $regex: username, $options: 'i' } }
    )

    const inventoryObject = {
      titles: user.titles,
      trophies: user.trophies,
      hats: user.hats
    }

    return res.json(inventoryObject)
  })

export default router
