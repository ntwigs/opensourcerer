import { FOR_DEV } from '../secret'
import rp from 'request-promise'

const getToken = () => {
  const token = localStorage.getItem('token')
  return token ? `Bearer ${ token }` : undefined
}

export const getEtag = async (username, etag) => {
  return await rp(`https://api.github.com/users/${ username }/events`, {
    method: 'HEAD',
    headers: {
      'If-None-Match': etag,
      Authorization: `Bearer ${ FOR_DEV }`
    },
    json: true,
    resolveWithFullResponse: true
  })
}

export const getInitialEvents = async username => {
  return await rp(`http://localhost:3001/events/${ username }`, {
    headers: {
      Authorization: getToken()
    },
    json: true
  })
}

export const getNewEvents = async username => {
  return await rp(`http://localhost:3001/users/${ username }/levelup`, {
    headers: {
      Authorization: getToken()
    },
    json: true
  })
}

export const getUserInformation = async username => {
  return await rp(`http://localhost:3001/users/${ username }`, {
    headers: {
      Authorization: getToken()
    },
    json: true
  })
}

export const getInventory = async () => {
  const username = localStorage.getItem('username')
  return await rp(`http://localhost:3001/users/${ username }/inventory`, {
    headers: {
      Authorization: getToken()
    },
    json: true
  })
}

