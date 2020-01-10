import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import { saga } from './sagas'

const initialState = {}
const enhancers = []
const sagaMiddleware = createSagaMiddleware()

export const history = createBrowserHistory()


const composedEnhancers = compose(
  applyMiddleware(routerMiddleware(history), sagaMiddleware),
  ...enhancers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


export const store = createStore(
  rootReducer(history),
  initialState,
  composedEnhancers
)

sagaMiddleware.run(saga)