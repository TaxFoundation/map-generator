import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MapGeneratorContext from '../../Context';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import PalettePreview from './PalettePreview';

const ColorControls = props => {
  const colorModes = ['lch', 'rgb', 'hsv'];
  const context = useContext(MapGeneratorContext);

  return (
    <div className={props.className}>
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
          {context.palettes[context.state.dataType].map(p => {
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
  );
};

ColorControls.propTypes = {
  className: PropTypes.string,
};

export default ColorControls;
