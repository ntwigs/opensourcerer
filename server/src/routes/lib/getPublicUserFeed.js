import setEventObjects from './setEventObjects'
import { getUserEvents } from './http'
import rp from 'request-promise'

export default async username => {
  const events = await getUserEvents(username, token)
  const organizedEvents = await setEventObjects(events) 
  const experience = organizedEvents.reduce((exp, event) => exp += event.events.experience, 0)
  const avatarUrl = events[0].actor.avatar_url
  const unregisteredUserContent = {
    organizedEvents,
    experience,
    avatarUrl,
    level: 0,
    titles: 'Not even a Noob'
  }

  return unregisteredUserContent
}