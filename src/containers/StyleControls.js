import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { range } from '../helpers';
import SelectList from '../components/controls/SelectList';
import ColorControls from '../components/controls/ColorControls';
import ColorModeControls from '../components/controls/ColorModeControls';
import { sequentialSteps, divergentSteps } from '../data/colorPalette';
import { updateDomain, updateDataType, updateSteps, updateColors, updateColorMode } from '../actions/actionCreators';
import { bindActionCreators } from 'redux';

const palettes = dataType => {
  switch (dataType) {
    case 'sequential':
      return sequentialSteps;
      break;
    case 'divergent':
      return divergentSteps;
      break;
    case 'qualitative':
      return ['n/a'];
      break;
  }
};

class StyleControls extends Component {
  render() {
    return (
      <div className="panel__section">
        <Typography variant="subheading">Describe Your Presentation</Typography>
        <Divider />
        <SelectList
          case="first"
          className="controls__control"
          label="What type of data is this?"
          listName="data-type"
          types={['sequential', 'divergent', 'qualitative']}
          update={this.props.updateDataType}
          value={this.props.dataType}
        />
        <ColorControls
          className="controls__control"
          colors={this.props.colors}
          colorMode={this.props.colorMode}
          dataType={this.props.dataType}
          updateColors={this.props.updateColors}
          steps={this.props.steps}
        />
        <ColorModeControls
          className="controls__control"
          colorMode={this.props.colorMode}
          updateColorMode={this.props.updateColorMode}
        />
        <SelectList
          className="controls__control"
          disabled={this.props.dataType === 'qualitative' ? true : false}
          label="How many bins should that data be divided into?"
          list-name="steps"
          types={palettes(this.props.dataType)}
          update={this.props.updateSteps}
          value={this.props.steps}
        />
      </div>
    );
  }
}

StyleControls.propTypes = {
  updateDataType: PropTypes.func,
  dataType: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
  colorMode: PropTypes.string,
  updateColors: PropTypes.func,
  steps: PropTypes.number,
  updateColorMode: PropTypes.func,
  updateSteps: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    dataType: state.dataType,
    domain: state.domain,
    scale: state.scale,
    steps: state.steps,
    colors: state.colors,
    colorMode: state.colorMode,
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
      updateColorMode: updateColorMode,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(StyleControls);
