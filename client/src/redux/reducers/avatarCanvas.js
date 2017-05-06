const defaultState = {
  hat: undefined,
  isHatRendered: false
}

export default ((state = defaultState, action) => {
  switch(action.type) {
    case 'SET_HAT':
      const updatedHatState = Object.assign({}, state, {
          hat: action.hat
      })

      return updatedHatState

    case 'IS_HAT_RENDERED':
      const updatedHatRenderState = Object.assign({}, state, {
          isHatRendered: !state.isHatRendered
      })

      return updatedHatRenderState
      
    default:
      return state
  }
})
