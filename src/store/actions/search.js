import types from '../constants/search'

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