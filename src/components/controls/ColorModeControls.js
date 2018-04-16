import React from 'react';
import PropTypes from 'prop-types';
import SelectList from './SelectList';

const ColorModeControls = props => {
  const colorModes = ['lch', 'rgb', 'hsv'];

  return (
    <SelectList
      className={props.className}
      list-name="color-mode-select"
      label="Which color mode do you want to use?"
      types={colorModes}
      update={props.updateColorMode}
      value={props.colorMode}
      case="upper"
    />
  );
};

ColorModeControls.propTypes = {
  className: PropTypes.string,
  updateColorMode: PropTypes.func,
  colorMode: PropTypes.string,
};

export default ColorModeControls;
