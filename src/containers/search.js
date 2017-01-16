import Search from '../components/search';
import { connect } from 'react-redux';
import { setSearchType, setSearchTerm, fetchSearch } from '../store/actions/creators';

function mapStateToProps(state) {
  return {
    searchType: state.search.type,
    searchTerm: state.search.term
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleTypeChange: (searchType) => {
      dispatch(setSearchType(searchType));
    },
    handleInputChange: (searchTerm) => {
      dispatch(setSearchTerm(searchTerm));
    },
    handleSearch: (searchType, searchTerm) => {
      dispatch(fetchSearch(searchType, searchTerm));
    }
  };
}

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

export default SearchContainer;
