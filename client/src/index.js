import React from 'react'
import ReactDOM from 'react-dom'
import Login from './components/Login'
import styled, { injectGlobal } from 'styled-components'
import User from './components/User'
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom'

const BodyWrapper = styled.div`
  width: 100wv;
  height: 100vh;
  background-color: #dedded;
  display: flex;
  flex-direction: column;
  background-color: #1e202f;
`

ReactDOM.render(
  <Router histrory={ browserHistory }>
    <BodyWrapper>
      <Route exact path='/' component={ Login } />
      <Route path='/users/:username' component={ User } />
    </BodyWrapper>
  </Router>,
  document.getElementById('root')
)

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Rubik+Mono+One');

  * {
    margin: 0;
    padding: 0;
    color: #dedded;
  }

  body {
    position: relative;
    width: 100%;
    height: 100%;
    background: #1e202f;
    font-family: 'Rubik Mono One', sans-serif;
  }
`


