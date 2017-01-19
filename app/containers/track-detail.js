import TrackDetail from '../components/track-detail';
import { connect } from 'react-redux';
import { setTrackPlaying, setTrackWhy, fetchPassword } from '../store/actions/creators';

function mapStateToProps(state) {
  return {
    password: state.password,
    trackPlaying: state.tracks.trackPlaying
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTrackPlaying: (track) => {
      dispatch(setTrackPlaying(track));
    },
    setTrackWhy: (why) => {
      dispatch(setTrackWhy(why));
    },
    generatePassword: (trackId, why) => {
      dispatch(fetchPassword(trackId, why));
    }
  };
}

const TrackDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackDetail);

export default TrackDetailContainer;
