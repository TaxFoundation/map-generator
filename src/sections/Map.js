import React from 'react';

import Panel from '../components/ui/Panel';
import PanelHeading from '../components/ui/PanelHeading';
import States from '../components/maps/States';

const Map = () => (
  <Panel columns={2}>
    <PanelHeading>Map</PanelHeading>
    <States />
  </Panel>
);

export default Map;
