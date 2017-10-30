import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

class Controls extends Component {
  render() {
    return (
      <Paper className="controls">
        <h2 className="controls__section">Map Options</h2>
        <Divider />
      </Paper>
    );
  }
}

export default Controls;