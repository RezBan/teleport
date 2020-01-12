import types from '../constants/list'

const initialState = {}

export default (state = {}, action) => {
  switch (action.type) {
    case types.GET: {
      return {
        ...state,
      }
    }

    case types.GET_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      }
    }

    case types.GET_FAILURE: {
      return {
        ...state,
        error: action.payload,
      }
    }

    case types.CLEAR_STORE: {
      return {
        ...initialState
      }
    }

    default:
      return state
  }
}