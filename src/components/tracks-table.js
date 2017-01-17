import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import Track from './track';

class TracksTable extends Component {
  componentDidMount() {
    this.props.fetchUserTopTracks();
  }

  render() {
    const {
      tracks,
      selectTrack,
      togglePreview,
      fetchArtistTopTracks
    } = this.props;

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
            tracks.tracks.map(track => <Track track={track} trackPlaying={track.trackPlaying} selectTrack={selectTrack} togglePreview={togglePreview} fetchArtistTopTracks={fetchArtistTopTracks} key={track.id} />)
          }
        </tbody>
      </Table>
    );
  }
}

export default TracksTable;
