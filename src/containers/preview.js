import Preview from '../components/preview';
import { connect } from 'react-redux';
import { setTrackPlaying } from '../store/actions/creators';


function mapStateToProps(state) {
  return {
    trackPlaying: state.tracks.trackPlaying,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setTrackPlaying: (trackPlaying) => {
      dispatch(setTrackPlaying(trackPlaying));
    }
  }
}

const PreviewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview);

export default PreviewContainer;
