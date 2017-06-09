const DEFAULT_STATE = {
  positions: [],
}

export default ((state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'SET_LEADERBOARD': {
      const updatedLeaderboard = Object.assign({}, state, {
        positions: action.payload,
      })

      return updatedLeaderboard
    }
    default:
      return state
  }
})
