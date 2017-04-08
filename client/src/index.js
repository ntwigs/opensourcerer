import React from 'react'
import ReactDOM from 'react-dom'
import Login from './Login'
import { BrowserRouter as Router, Route, BrowserHistory } from 'react-router-dom'

ReactDOM.render(
  <Router histrory={ BrowserHistory }>
    <Route path='/' component={ Login }/>
  </Router>,
  document.getElementById('root')
)
