import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapGeneratorContext from '../Context';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { range } from '../helpers';
import SelectList from '../components/controls/SelectList';
import ColorControls from '../components/controls/ColorControls';
import ColorModeControls from '../components/controls/ColorModeControls';
import { sequentialSteps, divergentSteps } from '../data/colorPalette';

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
      <MapGeneratorContext.Consumer>
        {context => (
          <div className="panel__section">
            <Typography variant="subheading">
              Describe Your Presentation
            </Typography>
            <Divider />
            <SelectList
              case="first"
              className="controls__control"
              label="What type of data is this?"
              listName="data-type"
              types={['sequential', 'divergent', 'qualitative']}
              update={data => context.updateState('dataType', data)}
              value={context.state.dataType}
            />
            <ColorControls
              className="controls__control"
              colors={context.state.colors}
              colorMode={context.state.colorMode}
              dataType={context.state.dataType}
              updateColors={data => context.updateState('colors', data)}
              steps={context.state.steps}
            />
            <ColorModeControls
              className="controls__control"
              colorMode={context.state.colorMode}
              updateColorMode={data => context.updateState('colorMode', data)}
            />
            <SelectList
              className="controls__control"
              disabled={context.state.dataType === 'qualitative' ? true : false}
              label="How many bins should that data be divided into?"
              list-name="steps"
              types={palettes(context.state.dataType)}
              update={data => context.updateState('steps', data)}
              value={context.state.steps}
            />
          </div>
        )}
      </MapGeneratorContext.Consumer>
    );
  }
}

StyleControls.propTypes = {
  colorMode: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
  dataType: PropTypes.string,
  steps: PropTypes.number,
  updateColorMode: PropTypes.func,
  updateColors: PropTypes.func,
  updateDataType: PropTypes.func,
  updateSteps: PropTypes.func,
};

export default StyleControls;
