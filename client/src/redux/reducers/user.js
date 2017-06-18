const DEFAULT_STATE = {
  experience: 0,
  avatarUrl: '',
  level: 0,
  title: '',
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
      } = action.userData

      const updatedUserState = Object.assign({}, state, {
        experience,
        level,
        avatarUrl,
        titles,
        title: titles[0],
        events: organizedEvents,
      })

      return updatedUserState
    }
    case 'USER_LEVELUP': {
      const {
        experience,
        events,
      } = action.newUserData

      const updatedUserState = Object.assign({}, state, {
        events: [...events, ...state.events],
        experience,
      })

      return updatedUserState
    }
    default:
      return state
  }
})
