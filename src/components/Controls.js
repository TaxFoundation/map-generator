import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import DataControls from '../containers/DataControls';
import StyleControls from '../containers/StyleControls';

class Controls extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({value});
  }

  render() {
    const { value } = this.state;
    
    return (
      <Paper className="controls panel">
        <Typography type="headline" className="panel__section">Map Options</Typography>
        <Divider />
        <AppBar position="static">
          <Tabs
            fullWidth
            onChange={this.handleChange}
          >
            <Tab label="Data">
            </Tab>
            <Tab label="Style">
            </Tab>
            <Tab label="Output"></Tab>
          </Tabs>
        </AppBar>
        {value === 0 && <DataControls />}
        {value === 1 && <StyleControls />}
        {value === 2}
      </Paper>
    );
  }
}

export default Controls;