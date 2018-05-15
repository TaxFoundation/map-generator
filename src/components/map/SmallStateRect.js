import React from 'react';
import MapGeneratorContext from '../../Context';
import { formatter } from '../../helpers';

const SmallStateRect = props => {
  const dimension = 24;
  const padding = 6;

  return (
    <MapGeneratorContext.Consumer>
      {context => (
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
            dy="-14"
            fontFamily="Lato"
            fontSize="10"
            textAnchor="end"
            x={props.smallState.x - padding}
            y={props.smallState.y + dimension - 1}
          >
            {props.abbr}
          </text>
          <text
            dy="-2"
            fontFamily="Lato"
            fontSize="10"
            textAnchor="end"
            x={props.smallState.x - padding}
            y={props.smallState.y + dimension - 1}
          >
            {formatter(
              {
                format: context.state.format,
                decimals: context.state.decimals,
                comma: context.state.comma,
                unit: context.state.unit,
              },
              props.value
            )}
          </text>
          {props.rank && context.state.showRank ? (
            <text
              dy="10"
              fontFamily="Lato"
              fontSize="10"
              textAnchor="end"
              x={props.smallState.x - padding}
              y={props.smallState.y + dimension - 1}
            >
              {props.rank}
            </text>
          ) : null}
        </g>
      )}
    </MapGeneratorContext.Consumer>
  );
};

export default SmallStateRect;
