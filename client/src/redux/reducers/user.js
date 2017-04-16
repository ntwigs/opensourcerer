const defaultState = {
  experience: 0
}

export default ((state = defaultState, action) => {
  switch(action.type) {
    case 'EXPERIENCE_UPDATE':
      const updatedExperienceState = Object.assign({}, state, {
        experience: state.experience + action.experience
      })

      return updatedExperienceState
    default:
      return state
  }
})
