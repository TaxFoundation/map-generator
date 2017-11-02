import React from 'react';

export default SmallStateRect = (props) => {
  return (
    <g>
      <rect
        x={props.smallState.x}
        y={props.smallState.y}
        height="16"
        width="16"
        fill={colorScale(props.theState.value)}
        stroke="#ffffff"
        strokeLinejoin="bevel"
      />
      <text
        fontSize="12"
        textAnchor="middle"
        x={props.smallState.x + 8}
        y={props.smallState.y + 28}
      >
        {props.theState.abbr}
      </text>
    </g>
  );
};
