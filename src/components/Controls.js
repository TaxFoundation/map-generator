import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import DataControls from '../containers/DataControls';
import StyleControls from '../containers/StyleControls';
import OutputControls from '../containers/OutputControls';

class Controls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };
  }

  handleChange = (event, value) => {
    this.setState({value});
  }

  render() {
    const { value } = this.state;

    return (
      <Paper className="controls panel">
        <Typography type="headline" className="panel__section">Map Options</Typography>
        <AppBar position="static">
          <Tabs
            onChange={this.handleChange}
            value={value}
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
        {value === 2 && <OutputControls />}
      </Paper>
    );
  }
}

export default Controls;