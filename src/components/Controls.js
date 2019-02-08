import React, { useState } from 'react';
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

const Controls = () => {
  const [value, setValue] = useState(0);

  return (
    <ControlsPanel>
      <PanelTypography variant="h5">Map Options</PanelTypography>
      <AppBar position="static">
        <Tabs
          onChange={(e, v) => {
            setValue(v);
          }}
          value={value}
        >
          <Tab label="Data" />
          <Tab label="Style" />
          <Tab label="Output" />
        </Tabs>
      </AppBar>
      {value === 0 && <DataControls />}
      {value === 1 && <StyleControls />}
      {value === 2 && <OutputControls />}
    </ControlsPanel>
  );
};

export default Controls;
