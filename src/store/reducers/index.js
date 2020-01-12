import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import listRedusers from './list'
import searchReducer from './search'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  list: listRedusers,
  city: searchReducer
})

export default rootReducer
