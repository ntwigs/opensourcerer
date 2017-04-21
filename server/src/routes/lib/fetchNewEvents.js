export default async username => {
  const events = await rp(`https://api.github.com/users/${ username }/events`, {
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

  const mappedNewEvents = await Promise.all(newEvents.map(async event => {
    const eventObject = await eventCleaner(event)
    return {
      id: event.id,
      type: event.type,
      repo: event.repo.name,
      events: eventObject
    }
  }))

  const experience = mappedNewEvents.reduce((exp, event) => exp += event.events.experience, user.experience)
  const level = levelCheck(experience)

  return {
    newEvents: mappedNewEvents,
    experience,
    level
  }
}