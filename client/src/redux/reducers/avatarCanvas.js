const defaultState = {
  hat: undefined,
  shouldRenderHat: false
}

export default ((state = defaultState, action) => {
  switch(action.type) {
    case 'SET_HAT':
      const updatedHatState = Object.assign({}, state, {
          hat: action.hat
      })

      return updatedHatState

    case 'TOGGLE_HAT_RENDER':
      const updatedHatRenderState = Object.assign({}, state, {
          shouldRenderHat: !state.shouldRenderHat
      })

      return updatedHatRenderState
      
    default:
      return state
  }
})
