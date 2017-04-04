import { Strategy as GitHubStrategy } from 'passport-github'
import passport from 'passport'

passport.use(new GitHubStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:2999/login/callback'
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

  } catch (error) {
    console.log(error)
  }
}))