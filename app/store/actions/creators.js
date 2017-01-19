import actionTypes from './types';
import fetch from 'isomorphic-fetch';

export function setTrackPlaying(track) {
  return {
    type: actionTypes.SET_TRACK_PLAYING,
    track
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

export function togglePasswordModal() {
  return {
    type: actionTypes.TOGGLE_PW_MODAL
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
      dispatch(setTrackPlaying(null));
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
      dispatch(setTrackPlaying(null));
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
    if (searchTerm === '' || searchTerm.split('').every(el => el === ' ')) {
      dispatch(receiveFromApi(actionTypes.FETCH_TRACKS_SUCCESS, []));
    } else {
      dispatch(requestFromApi(actionTypes.FETCH_TRACKS_REQUEST));

      return fetch(`/tracks/search/${searchTerm}`, {
        accept: 'application/json',
        credentials: 'include'
      })
      .then(response => response.json())
      .then(json => {
        const tracks = json.tracks.items;
        dispatch(receiveFromApi(actionTypes.FETCH_TRACKS_SUCCESS, tracks));
        dispatch(setTrackPlaying(null));
        dispatch(setSelectedTrack(tracks[0]));
        dispatch(setTrackWhy('vocals'));
      })
      .catch(error => {
        dispatch(handleError(actionTypes.FETCH_TRACKS_FAILURE, error));
      });
    }
  }
}

export function fetchPassword(trackId, why) {
  return function(dispatch) {
    dispatch(requestFromApi(actionTypes.FETCH_PW_REQUEST));
    dispatch(togglePasswordModal());
    const uri = '/tracks/password/' + trackId + '/' + why;

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

export function requestFromApi(type) {
    return {
        type
    }
}

export function receiveFromApi(type, data) {
    return {
        type,
        data
    }
}

export function handleError(type, error) {
    return {
        type,
        error
    }
}
