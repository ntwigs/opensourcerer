import rp from 'request-promise'
import UserSchema from '../../schemas/UserSchema'


export const getUserEvents = async (room, accessToken) =>
  rp(`https://api.github.com/users/${ room }/events`, {
    method: 'GET',
    headers: {
      Authorization: `token ${ accessToken }`,
      'User-Agent': 'Opensourcerer',
    },
    json: true,
  })
