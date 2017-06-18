import { Strategy as GitHubStrategy } from 'passport-github'
import passport from 'passport'
import rp from 'request-promise'
import UserSchema from '../schemas/UserSchema'
import eventCleaner from './eventCleaner'
import levelCheck from './levelCheck'

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new GitHubStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3001/login/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    if (!profile) throw new Error('No profile!')

    const { username } = profile
    const user = await UserSchema.findOne({ username })

    if (!user) {
      const events = await rp(`https://api.github.com/users/${ username }/events`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${ accessToken }`,
          'User-Agent': 'OpenSourcerer',
        },
        json: true,
      })

      const eventArray = await Promise.all(events.map(async (event) => {
        const { id, type, repo, created_at } = event
        const eventObject = await eventCleaner(event)
        return {
          id,
          type,
          events: eventObject,
          repo: repo.name,
          date: created_at,
        }
      }))

      const experience = eventArray.reduce((exp, event) => exp + event.events.experience, 0)
      const level = levelCheck(experience)

      const userObject = {
        username,
        events: eventArray,
        experience,
        avatar: profile._json.avatar_url,
        level,
        titles: 'Noob',
        accessToken,
      }

      await new UserSchema(userObject).save()
    } else {
      await UserSchema.findOneAndUpdate({ username }, {
        accessToken,
      })
    }

    done(null, profile)
  } catch (error) {
    console.log(error)
  }
}))
