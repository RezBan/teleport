import { all } from 'redux-saga/effects'
import listSaga from './list'
import searchSaga from './search'

export function* saga() {
  yield all([
    listSaga(),
    searchSaga()
  ])
}