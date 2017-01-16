import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import Track from './track';

class TracksTable extends Component {
  componentDidMount() {
    this.props.fetchUserTopTracks();
  }

  render() {
    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th></th>
            <th>Song</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Password strength</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.tracks.map(track => <Track track={track} trackPlaying={this.props.trackPlaying} selectTrack={this.props.selectTrack} togglePreview={this.props.togglePreview} fetchArtistTopTracks={this.props.fetchArtistTopTracks} key={track.id} />)
          }
        </tbody>
      </Table>
    );
  }
}

export default TracksTable;
