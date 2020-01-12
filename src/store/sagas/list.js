import { put, takeLatest } from 'redux-saga/effects'
import * as listActions from '../actions/list'
import _ from 'lodash'
import types from '../constants/list'
import axios from 'axios'

function* get(action) {
  try {
    const response = yield axios.get(
      `https://api.teleport.org/api/cities/?search=${action.payload.data}`
    )
    if (_.size(response)) {
      yield put({ type: types.GET_SUCCESS, payload: response.data })
    }
  } catch (e) {
    yield put(listActions.getFailure(e))
  }
}

export default function* listSaga() {
  yield takeLatest(types.GET, get)
}
