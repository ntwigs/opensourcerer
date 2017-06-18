import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import UserSchema from '../schemas/UserSchema'
import '../utils/authentication'

const router = express.Router()


router
  .get('/login', passport.authenticate('github', {
    scope: ['user', 'events'],
  }))
  .get('/login/callback',
    passport.authenticate('github', { failureRedirect: '/' }), async (req, res) => {
      const { user } = req
      if (!user) res.redirect('http://localhost:3000/')

      const existingUser = await UserSchema.findOne(
        { username: user.username },
      ).catch(error => console.log(error))

      if (!existingUser) res.redirect('http://localhost:3000/')
      const { _id: id, username } = existingUser
      const token = jwt.sign({ username, id }, process.env.JWT_SECRET)

      res.redirect(`http://localhost:3000/?username=${ existingUser.username }&token=${ token }`)
    })

export default router
