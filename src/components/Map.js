import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import USMap from '../containers/USMap';

class Map extends Component {
  render() {
    return (
      <Paper className="map panel">
        <Typography type="headline" className="panel__section">
          Map Result
        </Typography>
        <Divider />
        <div className="panel__section">
          <USMap />
        </div>
      </Paper>
    );
  }
}

export default Map;
