import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { PanelSection } from '../components/Panel';
import { saveSVG } from '../helpers';

class OutputControls extends Component {
  render() {
    return (
      <PanelSection>
        <Typography variant="subheading">Download Map</Typography>
        <Button
          variant="raised"
          color="primary"
          href={saveSVG('generated-map')}
          download="map.svg"
        >
          Download SVG
        </Button>
      </PanelSection>
    );
  }
}

export default OutputControls;
