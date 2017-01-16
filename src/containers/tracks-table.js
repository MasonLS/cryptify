import TracksTable from '../components/tracks-table';
import { connect } from 'react-redux';
import { fetchTop } from '../store/actions/creators';

function mapStateToProps(state) {
  return {
    topUserTracks: state.top.all,
    searchResults: state.search.results
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTopUserTracks() {
      dispatch(fetchTop('tracks'));
    }
  }
}

const TracksTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TracksTable);

export default TracksTableContainer;
