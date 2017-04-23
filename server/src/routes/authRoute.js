import express from 'express'
import passport from 'passport'
import UserSchema from '../schemas/UserSchema'
import jwt from 'jsonwebtoken'
import '../utils/authentication'
const router = express.Router()

router
  .get('/login', passport.authenticate('github', {
    scope: ['user', 'events']
  }))
  .get('/login/callback',
    passport.authenticate('github', { failureRedirect: '/' }), async (req, res) => {
      try {
        
        const { user } = req

        if (!user) await res.redirect('http://localhost:3000/')

        const existingUser = await UserSchema.findOne(
          { username: user.username }
        )

        if (!existingUser) await res.redirect('http://localhost:3000/')

        const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, process.env.JWT_SECRET)

        await res.redirect(`http://localhost:3000/?username=${ existingUser.username }&token=${ token }`)

      } catch(error) {
        console.log(error)
      }
    })

export default router
