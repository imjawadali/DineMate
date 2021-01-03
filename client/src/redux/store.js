import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import { epics } from './epics'
import appReducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const epicMiddleware = createEpicMiddleware()

const logger = createLogger({
  collapsed: true,
})

const store = createStore(
  appReducer,
  {},
  composeEnhancers(applyMiddleware(epicMiddleware, logger))
)

epicMiddleware.run(epics)

export default store