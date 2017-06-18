import rp from 'request-promise'
import jwt from 'jsonwebtoken'
import UserSchema from '../schemas/UserSchema'
import getPublicUserFeed from '../routes/lib/getPublicUserFeed'
import fetchNewEvents from '../routes/lib/fetchNewEvents'

const getEtag = async (room, accessToken) =>
  rp(`https://api.github.com/users/${ room }/events`, {
    method: 'HEAD',
    headers: {
      'User-Agent': 'Opensourcerer',
      Authorization: `token ${ accessToken }`,
    },
    json: true,
  })

const getData = async (client, room) => {
  const user = await UserSchema.findOne(
    { username: { $regex: room, $options: 'i' } },
  ).catch(error => console.log(error))

  if (!user) {
    const unregisteredUserObject = await getPublicUserFeed() // req param
    return client.emit('data', unregisteredUserObject)
  }

  const organizedEvents = user.events.map(event => ({
    id: event.id,
    events: event.events,
  }))

  const { avatar: avatarUrl, level, experience, titles } = user

  const newData = {
    organizedEvents,
    experience,
    level,
    avatarUrl,
    titles,
  }

  return client.emit('data', newData)
}

const getNewData = async (client, room) => {
  const user = await UserSchema.findOne(
    { username: { $regex: room, $options: 'i' } },
  )

  if (!user) {
    return client.emit('events', [])
  }

  const newEvents = await fetchNewEvents(user) // req

  const updatedUserObject = {
    events: [...newEvents.newEvents, ...user.events],
    experience: newEvents.experience,
    level: newEvents.level,
  }

  await UserSchema.findOneAndUpdate({
    username: user.username,
  }, updatedUserObject)

  return client.emit('events', updatedUserObject)
}

const checkEtag = async (client, oldEtag, room, token) => {
  try {
    let accessToken = null

    if (!token) {
      const user = await UserSchema.findOne(
        { username: { $regex: room, $options: 'i' } }, '-_id accessToken',
      ).catch(error => console.log(error))

      accessToken = user.accessToken
    } else {
      accessToken = token
    }

    const { etag } = await getEtag(room, accessToken)

    if (!oldEtag) {
      await getData(client, room)
    } else if (oldEtag !== etag) {
      await getNewData(client, room)
    }

    if (client.rooms.hasOwnProperty(room)) {
      setTimeout(checkEtag.bind(null, client, etag, room, accessToken), 1000)
    }
  } catch (error) {
    console.log(error)
  }
}

const initialize = (client) => {
  client.once('join', (room) => {
    client.join(room).emit('joinedRoom')
    // const user = jwt.verify(room)
    checkEtag(client, undefined, room)
  })
  client.once('disconnect', () => {
    client.leave()
  })
}

export const socket = io => io.on('connection', initialize)
