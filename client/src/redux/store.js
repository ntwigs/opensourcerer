import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers/index'
import promise from 'redux-promise-middleware'

export default createStore(reducers, applyMiddleware(promise()))
