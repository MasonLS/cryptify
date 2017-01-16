import React from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

const Search = ({
  searchType,
  searchTerm,
  handleInputChange,
  handleTypeChange,
  handleSearch
}) => (
  <Form inline>
    <FormGroup>
      <FormControl type="text" value={searchTerm} onChange={(e) => { handleInputChange(e.target.value) }}/>
    </FormGroup>
    <FormGroup>
      <FormControl componentClass="select" value={searchType} onChange={(e) => { e.preventDefault(); handleTypeChange(e.target.value) }}>
        <option value="tracks">Tracks</option>
        <option value="artists">Artists</option>
      </FormControl>
    </FormGroup>
    <Button onClick={() => { handleSearch(searchType, searchTerm) }}>Search</Button>
  </Form>
);

export default Search;
