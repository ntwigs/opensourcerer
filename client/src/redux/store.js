import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import reducers from './reducers/index'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, logger, thunk)(createStore)
export default createStoreWithMiddleware(reducers)

