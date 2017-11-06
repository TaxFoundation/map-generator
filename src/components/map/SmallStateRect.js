import React from 'react';

const SmallStateRect = (props) => {
  const dimension = 12;

  return (
    <g>
      <rect
        x={props.smallState.x}
        y={props.smallState.y}
        height={dimension}
        width={dimension}
        fill={props.fill}
        stroke="#ffffff"
        strokeLinejoin="bevel"
      />
      <text
        fontFamily="Lato"
        fontSize="12"
        textAnchor="end"
        x={props.smallState.x - dimension / 2}
        y={props.smallState.y + dimension - 1}
      >
        {props.abbr}
      </text>
    </g>
  );
};

export default SmallStateRect;