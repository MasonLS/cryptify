import TrackDetail from '../components/track-detail';
import { connect } from 'react-redux';
import { setTrackPlaying, setTrackWhy } from '../store/actions/creators';

function mapStateToProps(state) {
  return {
    track: state.password.track,
    why: state.password.why,
    trackPlaying: state.tracks.trackPlaying,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePreview: (trackId, playingTrackId) => {
      if (trackId === playingTrackId) {
        dispatch(setTrackPlaying(''));
      } else {
        dispatch(setTrackPlaying(trackId));
      }
    },
    setTrackWhy: (why) => {
      dispatch(setTrackWhy(why));
    }
  };
}

const TrackDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackDetail);

export default TrackDetailContainer;
