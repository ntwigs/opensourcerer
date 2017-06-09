import { getLeaderboard } from '../../lib/http'

export const setLeaderboard = async () => {
  const result = await getLeaderboard()
    .catch(e => console.log(e))

  return dispatch => dispatch({ type: 'SET_LEADERBOARD', payload: result })
}
