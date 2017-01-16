import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import Track from './track';

class TracksTable extends Component {
  componentDidMount() {
    this.props.fetchTopUserTracks();
  }

  render() {
    console.log('HEllow')
    const tracks = this.props.searchResults.length > 0 ? this.props.searchResults : this.props.topUserTracks;

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th></th>
            <th>Song</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Strength</th>
          </tr>
        </thead>
        <tbody>
          {
            tracks.map(track => <Track track={track} key={track.id} />)
          }
        </tbody>
      </Table>
    );
  }
}

export default TracksTable;
