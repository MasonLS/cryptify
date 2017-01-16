import actionTypes from './types';
import fetch from 'isomorphic-fetch';

export function setTrackPlaying(trackId) {
  return {
    type: actionTypes.SET_TRACK_PLAYING,
    trackId
  }
}

export function setSearchTerm(searchTerm) {
  return {
    type: actionTypes.SET_SEARCH_TERM,
    searchTerm
  }
}

export function setSelectedTrack(track) {
  return {
    type: actionTypes.SET_PW_TRACK,
    track
  }
}

export function setTrackWhy(why) {
  return {
    type: actionTypes.SET_PW_WHY,
    why
  }
}

export function fetchUserTopTracks() {
  return function(dispatch) {
    dispatch(requestFromApi(actionTypes.FETCH_TRACKS_REQUEST));

    return fetch('/tracks/top-tracks', {
      accept: 'application/json',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(json => {
      dispatch(receiveFromApi(actionTypes.FETCH_TRACKS_SUCCESS, json.items));
      dispatch(setSelectedTrack(json.items[0]));
      dispatch(setTrackWhy('vocals'));
    })
    .catch(error => {
      dispatch(handleError(actionTypes.FETCH_TRACKS_FAILURE, error));
    });
  }
}

export function fetchArtistTopTracks(artistId) {
  return function(dispatch) {
    dispatch(requestFromApi(actionTypes.FETCH_TRACKS_REQUEST));

    return fetch(`/tracks/${artistId}/top-tracks`, {
      accept: 'application/json',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(json => {
      dispatch(receiveFromApi(actionTypes.FETCH_TRACKS_SUCCESS, json.tracks));
      dispatch(setSelectedTrack(json.tracks[0]));
      dispatch(setTrackWhy('vocals'));
    })
    .catch(error => {
      dispatch(handleError(actionTypes.FETCH_TRACKS_FAILURE, error));
    });
  }
}

export function searchTracks(searchTerm) {
  return function(dispatch) {
    dispatch(requestFromApi(actionTypes.FETCH_TRACKS_REQUEST));

    return fetch(`/tracks/search/${searchTerm}`, {
      accept: 'application/json',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(json => {
      const tracks = json.tracks.items;
      dispatch(receiveFromApi(actionTypes.FETCH_TRACKS_SUCCESS, tracks));
      dispatch(setSelectedTrack(tracks[0]));
      dispatch(setTrackWhy('vocals'));
    })
    .catch(error => {
      dispatch(handleError(actionTypes.FETCH_TRACKS_FAILURE, error));
    });
  }
}

export function fetchPassword(trackId) {
  return function(dispatch) {
    dispatch(requestFromApi(actionTypes.FETCH_PW_REQUEST));
    const uri = '/tracks/password/' + trackId;

    return fetch(uri, {
      accept: 'application/json',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(password => {
      dispatch(receiveFromApi(actionTypes.FETCH_PW_SUCCESS, password));
    })
    .catch(error => {
      dispatch(handleError(actionTypes.FETCH_PW_FAILURE, error));
    });
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
