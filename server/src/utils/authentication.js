import { Strategy as GitHubStrategy } from 'passport-github'
import rp from 'request-promise'
import UserSchema from '../schemas/UserSchema'
import passport from 'passport'
import levelCalculator from './levelCalculator'

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

    const user = await UserSchema.findOne({ username })
    if (!user) {
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

      const experience = eventArray.reduce((exp, _) => levelCalculator(exp), 0)

      const userObject = {
        username,
        events: eventArray,
        experience,
        avatar: profile._json.avatar_url
      }

      await new UserSchema(userObject).save()
    }

    done(null, profile)

  } catch (error) {
    console.log(error)
  }
}))