import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  updateDomain,
  updateDataType,
  updateSteps,
  updateColors
} from '../actions/actionCreators';
import { bindActionCreators } from 'redux';

class OutputControls extends Component {
  render() {
    return (
      <div className="panel__section">

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dataType: state.dataType,
    domain: state.domain,
    scale: state.scale,
    steps: state.steps,
    colors: state.colors
  };
}

// anything returned will end up as props in OutputControls
function mapDispatchToProps(dispatch) {
  // whenever one of these is called, it's passed to reducers
  return bindActionCreators(
    {
      updateDataType: updateDataType,
      updateDomain: updateDomain,
      updateSteps: updateSteps,
      updateColors: updateColors
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(OutputControls);