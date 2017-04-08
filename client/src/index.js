import React from 'react'
import ReactDOM from 'react-dom'
import Login from './components/Login'
import User from './components/User'
import validateUser from './utils/validateUser'
import { BrowserRouter as Router, Route, BrowserHistory } from 'react-router-dom'

ReactDOM.render(
  <Router histrory={ BrowserHistory }>
    <div className='body-wrapper'>
      <Route exact path='/' component={ Login } />
      <Route path='/user/:username' component={ User } onEnter={ validateUser } />
    </div>
  </Router>,
  document.getElementById('root')
)
