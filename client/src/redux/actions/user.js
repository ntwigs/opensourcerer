import { getInitialEvents } from '../../lib/http'

export const experienceUpdate = experience => ({ type: 'EXPERIENCE_UPDATE', experience })
export const levelUpdate = level => ({ type: 'LEVEL_UPDATE', level })
export const avatarUpdate = avatarUrl => ({ type: 'AVATAR_UPDATE', avatarUrl })
export const titleUpdate = title => ({ type: 'TITLE_UPDATE', title })

export const updateUserData = async (username, etag) => {
  const result = await getInitialEvents(username)
  return dispatch => dispatch({ type: 'UPDATE_USER_DATA', payload: { result, etag } })
}
