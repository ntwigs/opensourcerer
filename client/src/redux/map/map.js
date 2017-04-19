import { bindActionCreators } from 'redux'
import * as userActions from '../actions/user'

export const mapDispatchToProps = dispatch => bindActionCreators({
  ...userActions
}, dispatch)
export const mapStateToProps = state => ({ state })
