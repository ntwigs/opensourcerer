const defaultState = {
  experience: 0,
  avatarUrl: ''
}

export default ((state = defaultState, action) => {
  switch(action.type) {
    case 'EXPERIENCE_UPDATE':
      const updatedExperienceState = Object.assign({}, state, {
        experience: action.experience
      })

      return updatedExperienceState
    case 'CHANGE_AVATAR':
      const updatedAvatarUrlState = Object.assign({}, state, {
        avatarUrl: action.avatarUrl
      })

      return updatedAvatarUrlState
    default:
      return state
  }
})
