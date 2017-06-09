const DEFAULT_STATE = {
  experience: 0,
  avatarUrl: '',
  level: 1,
  title: '',
  etag: '',
  events: [],
  titles: [],
  hats: [],
}

export default ((state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_USER_DATA': {
      const {
        experience,
        level,
        avatarUrl,
        organizedEvents,
        titles,
      } = action.payload.result

      const updatedUserState = Object.assign({}, state, {
        experience,
        level,
        avatarUrl,
        titles,
        title: titles[0],
        events: organizedEvents,
        etag: action.payload.etag,
      })

      return updatedUserState
    }
    default:
      return state
  }
})
