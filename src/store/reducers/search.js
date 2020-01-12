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

    case types.CHANGE: {
      return {
        ...state,
        name: action.payload.city,
        _links: {
          ...state._links,
          "city:country": {
            ...state._links["city:country"],
            name: action.payload.country
          }
        }
      }
    }

    default:
      return state
  }
}