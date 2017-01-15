import initialState from '../state';
import actionTypes from '../actions/types';

function top(state = initialState.top, action) {
  switch(action.type) {
    case actionTypes.FETCH_TOP_REQUEST:
      return {
        ...state,
        type: action.requestFor,
        isFetching: true,
        errorFetching: false
      };
    case actionTypes.FETCH_TOP_SUCCESS:
      return {
        ...state,
        all: action.data,
        isFetching: false
      };
    case actionTypes.FETCH_TOP_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorFetching: true
      };
    default:
      return state;
  }
}

export default top;
