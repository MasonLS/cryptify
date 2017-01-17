import initialState from '../state';
import actionTypes from '../actions/types';

function tracks(state = initialState.tracks, action) {
  switch (action.type) {
    case actionTypes.SET_TRACK_PLAYING:
      return {
        ...state,
        trackPlaying: action.trackId
      }
    case actionTypes.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.searchTerm
      }
    case actionTypes.FETCH_TRACKS_REQUEST:
      return {
        ...state,
        isFetching: true,
        errorFetching: false
      }
    case actionTypes.FETCH_TRACKS_SUCCESS:
      return {
        ...state,
        tracks: action.data,
        isFetching: false
      }
    case actionTypes.FETCH_TRACKS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorFetching: true
      }
    default:
      return state;
  }
}

export default tracks;
