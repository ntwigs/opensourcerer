import express from 'express'
import UserSchema from '../schemas/UserSchema'
const router = express.Router()

router
  .get('/users/:username', async (req, res) => {
    try {
      const username = req.params.username
      const user = await UserSchema.findOne(
        { username: { $regex: username, $options: 'i' } }
      )
      res.send(user)
    } catch(error) {
      console.log(error)
    }
  })

export default router