import actionTypes from './types';
import fetch from 'isomorphic-fetch';

export function setSelectedTrack(track) {
  return {
    type: actionTypes.SET_SELECTED_TRACK,
    track
  }
}

export function fetchTop(topType) {
  return function(dispatch) {
    dispatch(requestFromApi(actionTypes.FETCH_TOP_REQUEST, topType));
    const uri = topType === 'tracks' ? '/tracks/top' : '/artists/top';

    return fetch(uri, {
      accept: 'application/json'
    })
    .then(response => response.json())
    .then(top => {
      dispatch(receiveFromApi(actionTypes.FETCH_TOP_SUCCESS, top));
    })
    .catch(error => {
      dispatch(handleError(actionTypes.FETCH_TOP_FAILURE, error));
    })
  }
}

export function fetchSearch(searchType, searchTerm) {
  return function(dispatch) {
    dispatch(requestFromApi(actionTypes.FETCH_SEARCH_REQUEST, searchType));
    const uri = encodeURIComponent((searchType === 'tracks' ? '/tracks/search/' : '/artists/search/') + searchTerm);

    return fetch(uri, {
      accept: 'application/json'
    })
    .then(response => response.json())
    .then(results => {
      dispatch(receiveFromApi(actionTypes.FETCH_SEARCH_SUCCESS, results));
    })
    .catch(error => {
      dispatch(handleError(actionTypes.FETCH_TOP_FAILURE, error));
    })
  }
}

export function fetchPassword(trackId) {
  return function(dispatch) {
    dispatch(requestFromApi(actionTypes.FETCH_PW_REQUEST));
    const uri = encodeURIComponent('/tracks/password/' + trackId);

    return fetch(uri, {
      accept: 'application/json'
    })
    .then(response => response.json())
    .then(password => {
      dispatch(receiveFromApi(actionTypes.FETCH_PW_SUCCESS, password));
    })
    .catch(error => {
      dispatch(handleError(actionTypes.FETCH_PW_FAILURE, error));
    })
  }
}

function requestFromApi(type, requestFor) {
    return {
        type,
        requestFor
    }
}

function receiveFromApi(type, data) {
    return {
        type,
        data
    }
}

function handleError(type, error) {
    return {
        type,
        error
    }
}
