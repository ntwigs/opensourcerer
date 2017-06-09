import React from 'react'
import ReactDOM from 'react-dom'
import 'font-awesome/css/font-awesome.css'
import styled, { injectGlobal } from 'styled-components'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, browserHistory, Switch } from 'react-router-dom'
import { RouteTransition } from 'react-router-transition'
import Login from './components/Login'
import User from './components/User'
import Leaderboard from './components/Leaderboard'
import store from './redux/store'

const BodyWrapper = styled.div`
  width: 100wv;
  height: 100vh;
  background-color: #dedded;
  display: flex;
  flex-direction: column;
  background-color: #1e202f;
`

ReactDOM.render(
  <Provider store={ store }>
    <Router histrory={ browserHistory }>
      <BodyWrapper>
        <Route
          render={ ({ location }) =>
            <RouteTransition
              pathname={ location.pathname }
              atEnter={ { opacity: 0 } }
              atLeave={ { opacity: 0 } }
              atActive={ { opacity: 1 } }
            >
              <Switch key={ location.key } location={ location }>
                <Route exact path='/' component={ Login } />
                <Route path='/users/:username' component={ User } />
                <Route path='/leaderboard' component={ Leaderboard } />
              </Switch>
            </RouteTransition>
          }
        />
      </BodyWrapper>
    </Router>
  </Provider>,
  document.getElementById('root'),
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


