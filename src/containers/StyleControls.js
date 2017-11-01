import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataType from '../components/controls/DataType';
import {
  updateDomain,
  updateDataType,
  updateSteps,
  updateColors
} from '../actions/actionCreators';
import { bindActionCreators } from 'redux';

class StyleControls extends Component {
  render() {
    return (
      <div className="panel__section">
        <h3>Describe Your Presentation</h3>
        <DataType
          dataType={this.props.dataType}
          updateDataType={this.props.updateDataType}
        />
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

// anything returned will end up as props in StyleControls
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

export default connect(mapStateToProps, mapDispatchToProps)(StyleControls);
