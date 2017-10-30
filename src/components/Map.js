import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import USMap from './map/USMap';

class Map extends Component {
  render() {
    return (
      <Paper
        className="map"
      >
        <h2 className="map__section">Map Result</h2>
        <Divider />
        <USMap type="states" />
      </Paper>
    );
  }
}

export default Map;