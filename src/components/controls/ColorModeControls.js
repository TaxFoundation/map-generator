import React from 'react';
import SelectList from './SelectList';

const ColorModeControls = (props) => {
  const colorModes = [
    'lch',
    'rgb',
    'hsv'
  ];

  return (
    <SelectList
      list-name="color-mode-select"
      label="Which color mode do you want to use?"
      types={colorModes}
      update={props.updateColorMode}
      value={props.colorMode}
      case="upper"
    />
  );
};

export default ColorModeControls;
