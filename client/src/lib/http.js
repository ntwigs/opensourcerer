import rp from 'request-promise'

const getToken = () => {
  const token = localStorage.getItem('token')
  return token ? `Bearer ${ token }` : undefined
}

export const getEtag = async (username, etag) =>
  rp(`https://api.github.com/users/${ username }/events`, {
    method: 'HEAD',
    headers: {
      'If-None-Match': etag,
    },
    json: true,
    resolveWithFullResponse: true,
  })

export const getInitialEvents = async username =>
  rp(`http://localhost:3001/events/${ username }`, {
    headers: {
      Authorization: getToken(),
    },
    json: true,
  })

export const getNewEvents = async username =>
  rp(`http://localhost:3001/users/${ username }/levelup`, {
    headers: {
      Authorization: getToken(),
    },
    json: true,
  })

export const getUserInformation = async username =>
  rp(`http://localhost:3001/users/${ username }`, {
    headers: {
      Authorization: getToken(),
    },
    json: true,
  })

export const getInventory = async () => {
  const username = localStorage.getItem('username')
  return rp(`http://localhost:3001/users/${ username }/inventory`, {
    headers: {
      Authorization: getToken(),
    },
    json: true,
  })
}

export const getLeaderboard = async () =>
  rp('http://localhost:3001/users/leaderboard', {
    json: true,
  })

