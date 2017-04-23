import rp from 'request-promise'
import UserSchema from '../../schemas/UserSchema'


export const getUserEvents = async req => {
  const { id } = req.user
  const { username } = req.params
  const user = UserSchema.findOne({ _id: id })

  return await rp(`https://api.github.com/users/${ username }/events`, {
    method: 'GET',
    headers: {
      Authorization: user.accessToken,
      'User-Agent': 'Opensourcerer'
    },
    json: true
  })
}