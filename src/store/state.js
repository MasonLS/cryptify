export default {
  password: {
    track: null,
    hash: null,
    isFetching: false,
    errorFetching: false
  },
  search: {
    type: 'tracks',
    term: '',
    results: [],
    isFetching: false,
    errorFetching: false
  },
  top: {
    type: 'tracks',
    all: [],
    isFetching: false,
    errorFetching: false
  }
}
