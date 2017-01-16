import React from 'react';

const Track = ({
  track
}) => (
  <tr>
    <td></td>
    <td>{track.name}</td>
    <td>{track.artists.map(artist => <a key={artist.id}>{artist.name}</a>)}</td>
    <td>{track.album.name}</td>
    <td>{track.popularity}</td>
  </tr>
);

export default Track;
