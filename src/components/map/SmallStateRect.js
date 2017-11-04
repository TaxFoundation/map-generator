import React from 'react';

const SmallStateRect = (props) => {
  return (
    <g>
      <rect
        x={props.smallState.x}
        y={props.smallState.y}
        height="16"
        width="16"
        fill={props.fill}
        stroke="#ffffff"
        strokeLinejoin="bevel"
      />
      <text
        fontSize="12"
        textAnchor="middle"
        x={props.smallState.x + 8}
        y={props.smallState.y + 28}
      >
        {props.abbr}
      </text>
    </g>
  );
};

export default SmallStateRect;