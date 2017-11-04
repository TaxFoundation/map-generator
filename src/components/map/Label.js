import React from 'react';
import { labelColor } from '../../helpers';

const Label = (props) => {
  const labelOverrides = [];
  let labelX = props.center[0];
  let labelY = props.center[1] + 6;
  if (props.id in labelOverrides) {
    labelX = labelOverrides[props.id].x;
    labelY = labelOverrides[props.id].y;
  }

  return (
    <text
      fill={labelColor(props.fill)}
      fontFamily="Lato"
      fontSize="12"
      textAnchor="middle"
      x={labelX}
      y={labelY}
    >
      {props.abbr}
    </text>
  );
};

export default Label;