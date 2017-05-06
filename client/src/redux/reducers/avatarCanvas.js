const defaultState = {
  hat: undefined
}

export default ((state = defaultState, action) => {
  switch(action.type) {
    case 'SET_HAT':
      const { hat } = action

      const updatedHatState = Object.assign({}, state, {
          hat
      })

      return updatedHatState
    default:
      return state
  }
})
