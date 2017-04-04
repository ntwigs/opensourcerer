import express from 'express'
import passport from 'passport'
const router = express.Router()

router
    .get('/login', passport.authenticate('github'))
    .get('/login/callback',
      passport.authenticate('github'),
      (req, res) => {
        res.redirect('/')
      })

export default router
