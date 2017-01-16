import actionTypes from './types';
import fetch from 'isomorphic-fetch';

export function setTopType(topType) {
  return {
    type: actionTypes.SET_TOP_TYPE,
    topType
  }
}

export function setSearchType(searchType) {
  return {
    type: actionTypes.SET_SEARCH_TYPE,
    searchType
  };
}

export function setSearchTerm(searchTerm) {
  return {
    type: actionTypes.SET_SEARCH_TERM,
    searchTerm
  }
}

export function setSelectedTrack(track) {
  return {
    type: actionTypes.SET_SELECTED_TRACK,
    track
  }
}

export function fetchTop(topType) {
  return function(dispatch) {
    dispatch(requestFromApi(actionTypes.FETCH_TOP_REQUEST));
    const uri = topType === 'tracks' ? '/tracks/top' : '/artists/top';

    return fetch(uri, {
      accept: 'application/json',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(json => {
      dispatch(receiveFromApi(actionTypes.FETCH_TOP_SUCCESS, json.items));
    })
    .catch(error => {
      dispatch(handleError(actionTypes.FETCH_TOP_FAILURE, error));
    })
  }
}

export function fetchSearch(searchType, searchTerm) {
  return function(dispatch) {
    dispatch(requestFromApi(actionTypes.FETCH_SEARCH_REQUEST, searchType));
    const uri = (searchType === 'tracks' ? '/tracks/search/' : '/artists/search/') + searchTerm;

    return fetch(uri, {
      accept: 'application/json',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(json => {
      const results = json.artists || json.tracks;
      dispatch(receiveFromApi(actionTypes.FETCH_SEARCH_SUCCESS, results.items));
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

function requestFromApi(type) {
    return {
        type
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
