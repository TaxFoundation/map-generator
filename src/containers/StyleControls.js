import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { range } from '../helpers';
import SelectList from '../components/controls/SelectList';
import ColorControls from '../components/controls/ColorControls';
import ColorModeControls from '../components/controls/ColorModeControls';
import {
  updateDomain,
  updateDataType,
  updateSteps,
  updateColors,
  updateColorMode
} from '../actions/actionCreators';
import { bindActionCreators } from 'redux';

class StyleControls extends Component {
  render() {
    return (
      <div className="panel__section">
        <Typography type="subheading">Describe Your Presentation</Typography>
        <Divider />
        <SelectList
          listName="data-type"
          types={['sequential', 'divergent', 'qualitative']}
          update={this.props.updateDataType}
          value={this.props.dataType}
        />
        <ColorControls
          colors={this.props.colors}
          colorMode={this.props.colorMode}
          dataType={this.props.dataType}
          updateColors={this.props.updateColors}
          steps={this.props.steps}
        />
        <ColorModeControls
          colorMode={this.props.colorMode}
          updateColorMode={this.props.updateColorMode}
        />
        <SelectList
          list-name="steps"
          types={range([1, 10])}
          update={this.props.updateSteps}
          value={this.props.steps}
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
    colors: state.colors,
    colorMode: state.colorMode
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
      updateColors: updateColors,
      updateColorMode: updateColorMode
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(StyleControls);
