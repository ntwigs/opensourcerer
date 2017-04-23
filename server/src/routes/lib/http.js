import rp from 'request-promise'
import UserSchema from '../../schemas/UserSchema'


export const getUserEvents = async req => {
  const { username } = req.params
  const id = req.user ? req.user.id : undefined 
  const user = id ? UserSchema.findOne({ _id: id }) : undefined
  const accessToken = user ? user.accessToken : undefined

  return await rp(`https://api.github.com/users/${ username }/events`, {
    method: 'GET',
    headers: {
      Authorization: accessToken,
      'User-Agent': 'Opensourcerer'
    },
    json: true
  })
}