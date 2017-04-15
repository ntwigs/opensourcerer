import { Strategy as GitHubStrategy } from 'passport-github'
import rp from 'request-promise'
import UserSchema from '../schemas/UserSchema'
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
  callbackURL: 'http://localhost:3001/login/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    if (!profile) throw new Error('No profile!')

    const { username } = profile

    const events = await rp(`https://api.github.com/users/${ username }/events`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ process.env.GITHUB_ACCESS_TOKEN }`,
        'User-Agent': 'NorthernTwig'
      },
      json: true
    })

    const eventArray = events.map(event => {
      const { id, type, repo } = event
      
      return {
        id,
        type,
        repo: repo.name
      }
    })
    
    const userObject = {
      username,
      events: eventArray
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