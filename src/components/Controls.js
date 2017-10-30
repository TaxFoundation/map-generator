import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { Tabs, Tab } from 'material-ui/Tabs';

class Controls extends Component {
  render() {
    return (
      <Paper className="controls">
        <h2 className="controls__section">Map Options</h2>
        <Divider />
        <Tabs>
          <Tab label="Data"></Tab>
          <Tab label="Style"></Tab>
          <Tab label="Output"></Tab>
        </Tabs>
      </Paper>
    );
  }
}

export default Controls;