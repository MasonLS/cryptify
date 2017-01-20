import rp from 'request-promise';

export default {
  getUserTopTracks,
  getArtistTopTracks,
  searchTracks,
  getAudioFeatures,
  getAudioAnalysis
}

function getUserTopTracks(accessToken) {
  const options = {
    method: 'GET',
    uri: 'https://api.spotify.com/v1/me/top/tracks',
    headers: { 'Authorization': 'Bearer ' + accessToken },
    qs: {
      limit: 50
    },
    json: true
  };

  return rp(options);
}

function getArtistTopTracks(accessToken, artistId) {
  const options = {
    method: 'GET',
    uri: 'https://api.spotify.com/v1/artists/' + artistId + '/top-tracks',
    headers: { 'Authorization': 'Bearer ' + accessToken },
    qs: {
      country: 'US'
    },
    json: true
  };

  return rp(options);
}

function searchTracks(accessToken, trackName) {
  const options = {
    method: 'GET',
    uri: 'https://api.spotify.com/v1/search',
    headers: { 'Authorization': 'Bearer ' + accessToken },
    qs: {
      q: trackName,
      type: 'track',
      limit: 30,
      market: 'from_token'
    },
    json: true
  };

  return rp(options);
}

function getAudioFeatures(accessToken, trackId) {
  const options = {
    method: 'GET',
    uri: 'https://api.spotify.com/v1/audio-features/' + trackId,
    headers: { 'Authorization': 'Bearer ' + accessToken },
    json: true
  };

  return rp(options);
}

function getAudioAnalysis(accessToken, trackId) {
  const options = {
    method: 'GET',
    uri: 'https://api.spotify.com/v1/audio-analysis/' + trackId,
    headers: { 'Authorization': 'Bearer ' + accessToken },
    json: true
  };

  return rp(options);
}
