import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import USMap from '../containers/USMap';

class Map extends Component {
  render() {
    return (
      <Paper
        className="map panel"
      >
        <h2 className="panel__section">Map Result</h2>
        <Divider />
        <div className="panel__section">
          <USMap />
        </div>
      </Paper>
    );
  }
}

export default Map;