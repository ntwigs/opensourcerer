import React from 'react'
import ReactDOM from 'react-dom'
import Login from './components/Login'
import User from './components/User'
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom'

ReactDOM.render(
  <Router histrory={ browserHistory }>
    <div className='body-wrapper'>
      <Route exact path='/' component={ Login } />
      <Route path='/users/:username' component={ User } />
    </div>
  </Router>,
  document.getElementById('root')
)
