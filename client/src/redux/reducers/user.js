const defaultState = {
  experience: 0,
  avatarUrl: '',
  level: 1
}

export default ((state = defaultState, action) => {
  switch(action.type) {
    case 'EXPERIENCE_UPDATE':
      const updatedExperienceState = Object.assign({}, state, {
        experience: action.experience
      })

      return updatedExperienceState

    case 'LEVEL_UPDATE':
      const updateLevelState = Object.assign({}, state, {
        level: action.level
      })

      return updateLevelState

    case 'AVATAR_UPDATE':
      const updatedAvatarUrlState = Object.assign({}, state, {
        avatarUrl: action.avatarUrl
      })

      return updatedAvatarUrlState
    default:
      return state
  }
})
