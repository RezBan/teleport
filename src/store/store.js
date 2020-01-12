import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import { saga } from './sagas'

export const history = createBrowserHistory()

const initialState = {}
const enhancers = []
const sagaMiddleware = createSagaMiddleware()

const middleware = [
  routerMiddleware(history),
  sagaMiddleware
]

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore(
  rootReducer(history),
  initialState,
  composedEnhancers
)

sagaMiddleware.run(saga)

export default store