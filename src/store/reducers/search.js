import types from '../constants/search'

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

    default:
      return state
  }
}