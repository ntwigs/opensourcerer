import setEventObjects from './setEventObjects'
import levelCheck from '../../utils/levelCheck'
import rp from 'request-promise'

export default async user => {
  const events = await rp(`https://api.github.com/users/${ user.username }/events`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${ process.env.GITHUB_ACCESS_TOKEN }`,
      'User-Agent': 'NorthernTwig'
    },
    json: true
  })

  const newEvents = events.filter(event => {
    if (event.repo === undefined)
      return false

    if (!user.events.find(oldEvent => oldEvent.id === event.id)) {
      return true
    } else {
      return false
    }
  })

  const organizedEvents = newEvents.length > 0 ? await setEventObjects(newEvents) : []
  const experience = organizedEvents.reduce((exp, event) => exp += event.events.experience, user.experience)
  const level = levelCheck(experience)

  return {
    newEvents: organizedEvents,
    experience,
    level
  }
}