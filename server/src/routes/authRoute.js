import express from 'express'
import passport from 'passport'
import UserSchema from '../schemas/UserSchema'
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

          await res.redirect(`http://localhost:3000/?username=${ existingUser.username }`)

        } catch(error) {
          console.log(error)
        }
      })

export default router
