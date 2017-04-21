import express from 'express'
import UserSchema from '../schemas/UserSchema'
const router = express.Router()

router
  .get('/users/:username/:etag', async (req, res) => {
    try {
      const { username, etag } = req.params

      const user = await UserSchema.findOne(
        { username: { $regex: username, $options: 'i' } }
      )

      return user.etag !== etag ? res.json({ isNew: true }) : res.json({ isNew: false })
    } catch(error) {
      console.log(error)
    }
  })

export default router