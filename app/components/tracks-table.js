import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import Track from './track';

class TracksTable extends Component {
  componentDidMount() {
    if (this.props.tracks.length === 0) {
      this.props.fetchUserTopTracks();
    }
  }

  render() {
    const {
      tracks,
      selectTrack,
      setTrackPlaying,
      fetchArtistTopTracks
    } = this.props;

    if (tracks.tracks.length === 0) {
      return null;
    }

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
            tracks.tracks.map(track => <Track track={track} trackPlaying={tracks.trackPlaying} selectTrack={selectTrack} setTrackPlaying={setTrackPlaying} fetchArtistTopTracks={fetchArtistTopTracks} key={track.id} />)
          }
        </tbody>
      </Table>
    );
  }
}

export default TracksTable;
