import { bindActionCreators } from 'redux'
import * as userActions from '../actions/user'
import * as inventoryActions from '../actions/inventory'

export const mapDispatchToProps = dispatch => bindActionCreators({
  ...userActions,
  ...inventoryActions
}, dispatch)
export const mapStateToProps = state => ({ state })
