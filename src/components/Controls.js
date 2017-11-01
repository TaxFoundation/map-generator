import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { Tabs, Tab } from 'material-ui/Tabs';
import DataControls from '../containers/DataControls';

class Controls extends Component {
  render() {
    return (
      <Paper className="controls panel">
        <h2 className="panel__section">Map Options</h2>
        <Divider />
        <Tabs className="panel__section--scroll">
          <Tab label="Data">
            <DataControls />
          </Tab>
          <Tab label="Style"></Tab>
          <Tab label="Output"></Tab>
        </Tabs>
      </Paper>
    );
  }
}

export default Controls;