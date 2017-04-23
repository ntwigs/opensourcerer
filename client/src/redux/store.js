import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers/index'
import logger from 'redux-logger'

export default createStore(reducers, applyMiddleware(logger))
