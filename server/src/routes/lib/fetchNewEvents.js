import setEventObjects from './setEventObjects'
import levelCheck from '../../utils/levelCheck'
import { getUserEvents } from './http'

const setNew = (events, user) =>
  events.filter((event) => {
    if (event.repo === undefined) {
      return false
    }
    return !user.events.find(oldEvent => oldEvent.id === event.id)
  })

export default async (user, req) => {
  const events = await getUserEvents(req)
  const newEvents = setNew(events, user)
  const organizedEvents = newEvents.length > 0 ? await setEventObjects(newEvents) : []
  const experience = organizedEvents.reduce((exp, event) =>
    exp + event.events.experience, user.experience)
  const level = levelCheck(experience)

  return {
    newEvents: organizedEvents,
    experience,
    level,
  }
}
