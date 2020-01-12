import { put, takeLatest } from 'redux-saga/effects'
import * as searchActions from '../actions/search'
import _ from 'lodash'
import types from '../constants/search'
import axios from 'axios'

function* get(action) {
  try {
    const response = yield axios.get(
      `https://api.teleport.org/api/cities/geonameid:${action.payload.data}`
    )
    if (_.size(response)) {
      yield put({ type: types.GET_SUCCESS, payload: response.data })
    }
  } catch (e) {
    yield put(searchActions.getFailure(e))
  }
}

export default function* searchSaga() {
  yield takeLatest(types.GET, get)
}
