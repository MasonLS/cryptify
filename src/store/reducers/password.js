import initialState from '../state';
import actionTypes from '../actions/types';

function password(state = initialState.password, action) {
  switch(action.type) {
    case actionTypes.SET_PW_TRACK:
      return {
        ...initialState.password,
        track: action.track
      };
    case actionTypes.FETCH_PW_REQUEST:
      return {
        ...state,
        isFetching: true,
        errorFetching: false
      };
    case actionTypes.FETCH_PW_SUCCESS:
      return {
        ...state,
        hash: action.data,
        isFetching: false
      };
    case actionTypes.FETCH_PW_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorFetching: true
      };
    default:
      return state;
  }
}

export default password;
