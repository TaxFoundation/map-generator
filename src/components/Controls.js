import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styled from 'styled-components';
import { Panel, PanelTypography } from './Panel';
import DataControls from '../containers/DataControls';
import StyleControls from '../containers/StyleControls';
import OutputControls from '../containers/OutputControls';

const ControlsPanel = styled(Panel)`
  grid-column: 2 / 3;
  margin-right: 10px;
`;

class Controls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <ControlsPanel>
        <PanelTypography variant="headline">Map Options</PanelTypography>
        <AppBar position="static">
          <Tabs onChange={this.handleChange} value={this.state.value}>
            <Tab label="Data" />
            <Tab label="Style" />
            <Tab label="Output" />
          </Tabs>
        </AppBar>
        {this.state.value === 0 && <DataControls />}
        {this.state.value === 1 && <StyleControls />}
        {this.state.value === 2 && <OutputControls />}
      </ControlsPanel>
    );
  }
}

export default Controls;
