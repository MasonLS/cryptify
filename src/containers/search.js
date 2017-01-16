import Search from '../components/search';
import { connect } from 'react-redux';
import { setSearchTerm, searchTracks, fetchUserTopTracks } from '../store/actions/creators';

function mapStateToProps(state) {
  return {
    searchTerm: state.tracks.searchTerm
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleSearchTermChange: (searchTerm) => {
      dispatch(setSearchTerm(searchTerm));
    },
    handleSearch: (searchTerm) => {
      dispatch(searchTracks(searchTerm));
    },
    handleMyTopTracks: () => {
      dispatch(fetchUserTopTracks());
    }
  };
}

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

export default SearchContainer;
