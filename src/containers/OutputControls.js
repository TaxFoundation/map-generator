import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { saveSVG } from '../helpers';

class OutputControls extends Component {
  render() {
    return (
      <div className="panel__section">
        <Typography variant="subheading">Download Map</Typography>
        <Button
          variant="raised"
          color="primary"
          href={saveSVG('generated-map')}
          download="map.svg"
        >
          Download SVG
        </Button>
      </div>
    );
  }
}

export default OutputControls;
