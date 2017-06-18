import jwt from 'express-jwt'
import express from 'express'
import UserSchema from '../schemas/UserSchema'
import fetchNewEvents from './lib/fetchNewEvents'

const router = express.Router()

router
  .get('/users/leaderboard', async (req, res) => {
    const users = await UserSchema.find({}, '-_id username avatar level experience selectedHat selectedTitle')
      .sort({ experience: 1 })
      .limit(10)
      .catch(error => console.log(error))

    res.json(users)
  })
  .get('/users/:username', async (req, res) => {
    const { username } = req.params
    const user = await UserSchema.findOne(
      { username: { $regex: username, $options: 'i' } },
    ).catch(error => console.log(error))
    res.send(user)
  })
  .get('/users/:username/levelup', async (req, res) => {
    try {
      const { username } = req.params
      const user = await UserSchema.findOne(
        { username: { $regex: username, $options: 'i' } },
      )

      if (!user) {
        return res.json({
          events: [],
        })
      }

      const newEvents = await fetchNewEvents(user, req)

      const updatedUserObject = {
        events: [...newEvents.newEvents, ...user.events],
        experience: newEvents.experience,
        level: newEvents.level,
      }

      await UserSchema.findOneAndUpdate({
        username: user.username,
      }, updatedUserObject)

      return res.json(updatedUserObject)
    } catch (error) {
      return console.log(error)
    }
  })
  .get('/users/:username/inventory', jwt({
    secret: process.env.JWT_SECRET,
  }), async (req, res) => {
    const { username } = req.params

    if (req.user.username !== username) {
      return res.json({
        available: false,
      })
    }

    const user = await UserSchema.findOne(
      { username: { $regex: username, $options: 'i' } },
    )

    const inventoryObject = {
      available: true,
      titles: user.titles,
      trophies: user.trophies,
      hats: user.hats,
    }

    return res.json(inventoryObject)
  })

export default router
