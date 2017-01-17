import TracksTable from '../components/tracks-table';
import { connect } from 'react-redux';
import { fetchUserTopTracks, fetchArtistTopTracks, setSelectedTrack, setTrackPlaying } from '../store/actions/creators';

function mapStateToProps(state) {
  return {
    tracks: state.tracks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUserTopTracks: () => {
      dispatch(fetchUserTopTracks());
    },
    fetchArtistTopTracks: (artistId) => {
      dispatch(fetchArtistTopTracks(artistId));
    },
    selectTrack: (track) => {
      dispatch(setSelectedTrack(track));
    },
    togglePreview: (trackId, playingTrackId) => {
      if (trackId === playingTrackId) {
        dispatch(setTrackPlaying(''));
      } else {
        dispatch(setTrackPlaying(trackId));
      }
    }
  }
}

const TracksTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TracksTable);

export default TracksTableContainer;
