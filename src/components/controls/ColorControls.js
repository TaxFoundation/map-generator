import React, { Component } from 'react';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import PalettePreview from './PalettePreview';
import {
  sequentialColorPalettes,
  divergentColorPalettes,
  qualitativeColorPalettes
} from '../../data/colorPalette';

class ColorControls extends Component {
  constructor(props) {
    super(props);

    this.palettes = {
      sequential: sequentialColorPalettes,
      divergent: divergentColorPalettes,
      qualitative: qualitativeColorPalettes
    };

    this.colorModes = [
      'lch',
      'rgb',
      'hsv'
    ];
  }

  render() {
    return (
      <FormControl fullWidth>
        <InputLabel htmlFor="color-palette">Color Palette</InputLabel>
        <Select
          input={<Input id="color-palette" />}
          onChange={event => {
            this.props.updateColors(event.target.value);
          }}
          renderValue={(value) => {
            return (
              <PalettePreview
                colorMode={this.props.colorMode}
                palette={value}
                steps={this.props.steps}
              />);
          }}
          value={this.props.colors}
        >
          {this.palettes[this.props.dataType].map(p => {
            return (
              <MenuItem key={`palette-${p.id}`} value={p.palette}>
                <PalettePreview
                  mode={this.props.colorMode}
                  palette={p.palette}
                  steps={this.props.steps}
                />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}

export default ColorControls;
