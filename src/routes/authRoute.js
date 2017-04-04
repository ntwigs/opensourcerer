import express from 'express'
import passport from 'passport'
import '../utils/authentication'
const router = express.Router()

router
    .get('/login', passport.authenticate('github', {
      scope: ['user']
    }))
    .get('/login/callback',
      passport.authenticate('github'),
      (req, res) => {
        res.redirect('/')
      })

export default router
