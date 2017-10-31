import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import USMap from './map/USMap';

class Map extends Component {
  render() {
    return (
      <Paper
        className="map panel"
      >
        <h2 className="panel__section">Map Result</h2>
        <Divider />
        <div className="panel__section">
          <USMap type="states" />
        </div>
      </Paper>
    );
  }
}

export default Map;