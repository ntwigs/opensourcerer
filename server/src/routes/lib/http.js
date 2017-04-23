import rp from 'request-promise'

export const getUserEvents = async (username, token) => await rp(`https://api.github.com/users/${ username }/events`, {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${ token }`,
    'User-Agent': 'Opensourcerer'
  },
  json: true
})