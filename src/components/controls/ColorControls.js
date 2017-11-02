import React from 'react';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { colorScale } from '../../helpers';
import colorPalettes from '../../data/colorPalette';

const ColorControls = props => {
  const PaletteDisplay = props => {
    return (
      <div style={{ width: '100%' }}>
        {[...Array(props.steps).keys()].map(s => {
          return (
            <div
              key={`palette-step-${s + 1}`}
              style={{
                backgroundColor: colorScale(props.palette, [
                  0,
                  props.steps - 1
                ])(s),
                display: 'inline-block',
                height: '20px',
                marginTop: '6px',
                width: `${100 / props.steps}%`
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="color-palette">Color Palette</InputLabel>
      <Select
        input={<Input id="color-palette" />}
        onChange={event => {
          props.updateColors(event.target.value);
        }}
        renderValue={(value) => {
          return <PaletteDisplay palette={value} steps={props.steps} />;
        }}
        value={props.colors}
      >
        {colorPalettes.map(p => {
          return (
            <MenuItem key={`palette-${p.id}`} value={p.palette}>
              <PaletteDisplay palette={p.palette} steps={props.steps} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default ColorControls;
