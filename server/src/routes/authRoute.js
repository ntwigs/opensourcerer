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
    .get('/login/success', async (req, res) => {
      try {
        const { user } = req

        if (!user) await res.redirect('/')

        const existingUser = await UserSchema.findOne(
          { username: user.username }
        )

        if (!existingUser) await res.redirect('/')

        const token = jwt.sign(
          { username: existingUser.username, id: existingUser._id },
          process.env.JWT_SECRET
        )

        res.redirect(`/jwt=${ token }`)

      } catch(error) {
        console.log(error)
      }

    })
    .get('/login/callback',
      passport.authenticate('github', {
        successRedirect: '/login/success',
        failureRedirect: '/'
      }))

export default router
