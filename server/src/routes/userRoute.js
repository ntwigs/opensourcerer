import express from 'express'
import UserSchema from '../schemas/UserSchema'
const router = express.Router()

router
  .get('/users/:username', async (req, res) => {
    try {
      const username = req.params

      const user = await UserSchema.findOne({ username })
      res.json(user)
    } catch(error) {
      console.log(error)
    }
  })

export default router