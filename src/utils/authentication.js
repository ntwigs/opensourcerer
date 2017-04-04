import { Strategy as GitHubStrategy } from 'passport-github'
import UserSchema from '../schemas/UserModel'
import passport from 'passport'

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new GitHubStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/login/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {

    if (!profile) throw new Error('No profile!')

    const { username } = profile

    const userObject = {
      username,
      accessToken
    }

    const existingUser = await UserSchema.findOneAndUpdate(
      { username },
      userObject,
      {
        upsert: true,
        new: true
      }
    )

    done(null, profile)

  } catch (error) {
    console.log(error)
  }
}))