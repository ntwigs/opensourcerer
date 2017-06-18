import eventCleaner from '../../utils/eventCleaner'

export default async events =>
  Promise.all(events.map(async (event) => {
    const eventObject = await eventCleaner(event)

    return {
      id: event.id,
      type: event.type,
      repo: event.repo.name,
      events: eventObject,
    }
  }))

