import setEventObjects from './setEventObjects'
import rp from 'request-promise'

export default async username => {
  const events = await rp(`https://api.github.com/users/${ username }/events`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${ process.env.GITHUB_ACCESS_TOKEN }`,
      'User-Agent': 'NorthernTwig'
    },
    json: true
  })

  const organizedEvents = await setEventObject(events) 
  const experience = organizedEvents.reduce((exp, event) => exp += event.events.experience, 0)
  const avatarUrl = events[0].actor.avatar_url

  return {
    organizedEvents,
    experience,
    avatarUrl,
    level: 0,
    titles: 'Not even a Noob'
  }
}