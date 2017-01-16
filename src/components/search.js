import React from 'react';
import { FormControl, Button, InputGroup, Glyphicon } from 'react-bootstrap';

const Search = ({
  searchTerm,
  handleSearchTermChange,
  handleSearch,
  handleMyTopTracks
}) => (
  <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchTerm) }}>
    <InputGroup>
      <FormControl type="text" value={searchTerm} onChange={(e) => { handleSearchTermChange(e.target.value) }}/>
      <InputGroup.Button>
        <Button onClick={() => { handleSearch(searchTerm) }}><Glyphicon glyph="search" />{' '}Search tracks</Button>
        <Button onClick={() => { handleMyTopTracks() }}><Glyphicon glyph="star" />{' '}My top tracks</Button>
      </InputGroup.Button>
    </InputGroup>
  </form>
);

export default Search;
