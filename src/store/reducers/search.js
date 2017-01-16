import initialState from '../state';
import actionTypes from '../actions/types';

function search(state = initialState.search, action) {
  switch(action.type) {
    case actionTypes.SET_SEARCH_TYPE:
      return {
        ...state,
        type: action.searchType
      };
    case actionTypes.SET_SEARCH_TERM:
      return {
        ...state,
        term: action.searchTerm
      };
    case actionTypes.FETCH_SEARCH_REQUEST:
      return {
        ...state,
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
