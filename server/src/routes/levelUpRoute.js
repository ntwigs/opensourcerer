import express from 'express'
import passport from 'passport'
import UserSchema from '../schemas/UserSchema'
import '../utils/authentication'
const router = express.Router()

router
  .get('/levelup', async (req, res) => {
    console.log(req.body)
    res.sendStatus(200)    
  })


export default router
