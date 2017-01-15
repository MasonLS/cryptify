import initialState from '../state';
import actionTypes from '../actions/types';

function search(state = initialState.search, action) {
  switch(action.type) {
    case actionTypes.FETCH_SEARCH_REQUEST:
      return {
        ...state,
        type: action.requestFor,
        isFetching: true,
        errorFetching: false
      };
    case actionTypes.FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        results: action.data,
        isFetching: false
      };
    case actionTypes.FETCH_SEARCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorFetching: true
      };
    default:
      return state;
  }
}

export default search;
