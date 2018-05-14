import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapGeneratorContext from '../../Context';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import PalettePreview from './PalettePreview';
import {
  sequentialColorPalettes,
  divergentColorPalettes,
  qualitativeColorPalettes,
} from '../../data/colorPalette';

class ColorControls extends Component {
  constructor(props) {
    super(props);

    this.palettes = {
      sequential: sequentialColorPalettes,
      divergent: divergentColorPalettes,
      qualitative: qualitativeColorPalettes,
    };

    this.colorModes = ['lch', 'rgb', 'hsv'];
  }

  render() {
    return (
      <MapGeneratorContext.Consumer>
        {context => (
          <div className={this.props.className}>
            <FormControl fullWidth>
              <InputLabel htmlFor="color-palette">Color Palette</InputLabel>
              <Select
                input={<Input id="color-palette" />}
                onChange={event => {
                  context.updateState('colors', event.target.value);
                  let newActives = { ...context.state.activeDataTypeColors };
                  newActives[context.state.dataType] = event.target.value;
                  context.updateState('activeDataTypeColors', newActives);
                }}
                renderValue={value => {
                  return (
                    <PalettePreview
                      colorMode={context.state.colorMode}
                      palette={value}
                      steps={context.state.steps}
                    />
                  );
                }}
                value={context.state.colors}
              >
                {this.palettes[context.state.dataType].map(p => {
                  return (
                    <MenuItem key={`palette-${p.id}`} value={p.palette}>
                      <PalettePreview
                        mode={context.state.colorMode}
                        palette={p.palette}
                        steps={context.state.steps}
                      />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        )}
      </MapGeneratorContext.Consumer>
    );
  }
}

ColorControls.propTypes = {
  className: PropTypes.string,
};

export default ColorControls;
