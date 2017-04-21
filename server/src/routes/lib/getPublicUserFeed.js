export default async username => {
  const events = await rp(`https://api.github.com/users/${ username }/events`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${ process.env.GITHUB_ACCESS_TOKEN }`,
      'User-Agent': 'NorthernTwig'
    },
    json: true
  })

  const organizedEvents = await Promise.all(events.map(async event => {
    const eventObject = await eventCleaner(event)

    return {
      id: event.id,
      type: event.type,
      repo: event.repo.name,
      events: eventObject
    }
  }))

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