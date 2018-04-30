import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  updateColors,
  updateDataType,
  updateDomain,
  updateSteps,
} from '../actions/actionCreators';
import { bindActionCreators } from 'redux';
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

function mapStateToProps(state) {
  return {
    colors: state.colors,
    dataType: state.dataType,
    domain: state.domain,
    scale: state.scale,
    steps: state.steps,
  };
}

// anything returned will end up as props in OutputControls
function mapDispatchToProps(dispatch) {
  // whenever one of these is called, it's passed to reducers
  return bindActionCreators(
    {
      updateColors: updateColors,
      updateDataType: updateDataType,
      updateDomain: updateDomain,
      updateSteps: updateSteps,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(OutputControls);
