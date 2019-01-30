import React, { Component } from 'react';
import MapGeneratorContext from '../Context';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import SelectList from '../components/controls/SelectList';
import ColorControls from '../components/controls/ColorControls';
import ColorModeControls from '../components/controls/ColorModeControls';
import { sequentialSteps, divergentSteps } from '../data/colorPalette';

const StyledFormControl = styled(FormControl)`
  display: block !important;
  margin: 0 auto !important;
  padding: 10px !important;
  width: 90%;
`;

class StyleControls extends Component {
  render() {
    return (
      <MapGeneratorContext.Consumer>
        {context => (
          <StyledFormControl>
            <FormLabel>Describe Your Presentation</FormLabel>
            <Divider />
            <SelectList
              case="first"
              className="controls__control"
              label="What type of data is this?"
              listName="data-type"
              types={['sequential', 'divergent', 'qualitative']}
              update={data => {
                context.updateState('dataType', data);
                context.updateState(
                  'colors',
                  context.state.activeDataTypeColors[data]
                );
                if (data !== 'qualitative') {
                  context.updateState(
                    'steps',
                    context.state.activeDataTypeSteps[data]
                  );
                }
              }}
              value={context.state.dataType}
            />
            <FormLabel>How Should the Data be Formatted?</FormLabel>
            <div>
              <FormControlLabel
                checked={context.state.format === 'number'}
                value="number"
                control={
                  <Radio
                    color="primary"
                    onChange={e => context.updateState('format', 'number')}
                  />
                }
                label="Numbers"
              />
              <FormControlLabel
                checked={context.state.format === 'dollar'}
                value="dollar"
                control={
                  <Radio
                    color="primary"
                    onChange={e => context.updateState('format', 'dollar')}
                  />
                }
                label="Dollars"
              />
              <FormControlLabel
                checked={context.state.format === 'percentage'}
                value="percentage"
                control={
                  <Radio
                    color="primary"
                    onChange={e => context.updateState('format', 'percentage')}
                  />
                }
                label="Percentages"
              />
            </div>
            <TextField
              label="Show this many decimal places."
              inputProps={{ min: 0, step: 1 }}
              value={context.state.decimals}
              onChange={e => context.updateState('decimals', +e.target.value)}
              margin="normal"
              type="number"
              fullWidth
            />
            <ColorControls className="controls__control" />
            <ColorModeControls
              className="controls__control"
              colorMode={context.state.colorMode}
              updateColorMode={data => context.updateState('colorMode', data)}
            />
            {context.state.dataType === 'qualitative' ? null : (
              <SelectList
                className="controls__control"
                label="How many bins should that data be divided into?"
                list-name="steps"
                types={
                  context.state.dataType === 'sequential'
                    ? sequentialSteps
                    : divergentSteps
                }
                update={data => {
                  context.updateState('steps', data);
                  let newSteps = { ...context.state.activeDataTypeSteps };
                  newSteps[context.state.dataType] = data;
                  context.updateState('activeDataTypeSteps', newSteps);
                }}
                value={context.state.steps}
              />
            )}
          </StyledFormControl>
        )}
      </MapGeneratorContext.Consumer>
    );
  }
}

export default StyleControls;
