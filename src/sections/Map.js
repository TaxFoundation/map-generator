import React, { useContext } from 'react';

import { DataContext } from '../contexts/DataContext';
import Panel from '../components/ui/Panel';
import PanelHeading from '../components/ui/PanelHeading';
import States from '../components/maps/States';

const Map = () => {
  const { data: mapContext } = useContext(DataContext);
  const { mapGeographyType: geography } = mapContext;

  return (
    <Panel columns={2}>
      <PanelHeading>Map</PanelHeading>
      {getMap(geography)}
    </Panel>
  );
};

const getMap = geography => {
  switch (geography) {
    case 'states':
      return <States />;
    default:
      return <div>Waiting for map geography type selection.</div>;
  }
};

export default Map;
