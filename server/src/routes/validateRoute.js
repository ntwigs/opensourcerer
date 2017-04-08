import express from 'express'
import jwtValidator from './middlewares/jwtValidator'
const router = express.Router()

router
    .get('/validate', jwtValidator, (req, res) => {
      console.log(req.user)
      res.send('validate')
    })

export default router
