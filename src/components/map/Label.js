import React from 'react';
import { labelColor } from '../../helpers';

const Label = props => {
  if (!isNaN(props.center[0]) && !isNaN(props.center[1])) {
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
        fontSize="10"
        textAnchor="middle"
        x={labelX}
        y={labelY}
      >
        {props.abbr}
      </text>
    );
  } else {
    return null;
  }
};

export default Label;
