import React, { useContext } from 'react';
import MapGeneratorContext from '../Context';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';
import { Panel, PanelTypography, PanelSection } from './Panel';
import USMap from '../containers/USMap';

const MapPaper = styled(Panel)`
  grid-column: 1 / 2;
  margin-left: 10px;
`;

const Map = props => {
  const context = useContext(MapGeneratorContext);
  return (
    <MapPaper>
      <PanelTypography variant="h5">Map Result</PanelTypography>
      <Divider />
      <PanelSection>
        <USMap
          mapData={context.state.mapData}
          colorMode={context.state.colorMode}
          colors={context.state.colors}
          domain={context.state.domain}
          mapType={context.state.mapType}
          steps={context.state.steps}
        />
      </PanelSection>
    </MapPaper>
  );
};

export default Map;
