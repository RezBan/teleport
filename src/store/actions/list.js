import types from '../constants/list'

export const get = (data) => ({
  type: types.GET,
  payload: {
    data
  }
})

export const getSuccess = ({ data }) => ({
  type: types.GET_SUCCESS,
  payload: {
    data
  }
})

export const getFailure = (error) => ({
  type: types.GET_FAILURE,
  payload: error
})

export const getInitialState = () => ({
  type: types.CLEAR_STORE,
  payload: null
})