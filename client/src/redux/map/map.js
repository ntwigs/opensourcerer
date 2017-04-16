import { bindActionCreators } from 'redux'
import { experienceUpdate, avatarUpdate } from '../actions/user'

export const mapDispatchToProps = dispatch => bindActionCreators({
  experienceUpdate,
  avatarUpdate
}, dispatch)
export const mapStateToProps = state => ({ state })
