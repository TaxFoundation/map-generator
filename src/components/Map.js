import React, { Component } from 'react';
import MapGeneratorContext from '../Context';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import USMap from '../containers/USMap';

class Map extends Component {
  render() {
    return (
      <Paper className="map panel">
        <Typography variant="headline" className="panel__section">
          Map Result
        </Typography>
        <Divider />
        <div className="panel__section">
          <MapGeneratorContext.Consumer>
            {context => (
              <USMap
                mapData={context.state.mapData}
                colorMode={context.state.colorMode}
                colors={context.state.colors}
                domain={context.state.domain}
                mapType={context.state.mapType}
                steps={context.state.steps}
              />
            )}
          </MapGeneratorContext.Consumer>
        </div>
      </Paper>
    );
  }
}

export default Map;
