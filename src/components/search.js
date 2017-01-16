import React from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

const Search = ({
  searchTerm,
  handleSearchTermChange,
  handleSearch,
  handleMyTopTracks
}) => (
  <Form inline onSubmit={(e) => { e.preventDefault(); handleSearch(searchTerm) }}>
    <FormGroup>
      <FormControl type="text" value={searchTerm} onChange={(e) => { handleSearchTermChange(e.target.value) }}/>
    </FormGroup>
    {' '}
    <Button type="submit" onClick={() => { handleSearch(searchTerm) }}>Search tracks</Button>
    {' '}
    <Button onClick={() => { handleMyTopTracks() }}>My top tracks</Button>
  </Form>
);

export default Search;
