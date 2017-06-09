import { bindActionCreators } from 'redux'
import * as userActions from '../actions/user'
import * as inventoryActions from '../actions/inventory'
import * as avatarCanvasActions from '../actions/avatarCanvas'
import * as leaderboardActions from '../actions/leaderboard'

export const mapDispatchToProps = dispatch => bindActionCreators({
  ...userActions,
  ...inventoryActions,
  ...avatarCanvasActions,
  ...leaderboardActions,
}, dispatch)
export const mapStateToProps = state => ({ state })
