import React from 'react';
import MapGeneratorContext from '../../Context';
import { formatter, labelColor } from '../../helpers';

const Label = props => {
  if (!isNaN(props.center[0]) && !isNaN(props.center[1])) {
    let labelX = props.center[0] + props.adjustment[0];
    let labelY = props.center[1] + props.adjustment[1] + 6;

    let color = props.id === 15 ? '#333' : labelColor(props.fill);

    return (
      <MapGeneratorContext.Consumer>
        {context => (
          <g transform={`translate(${labelX}, ${labelY})`}>
            <text
              dy="-6"
              fill={color}
              fontFamily="Lato"
              fontSize="10"
              textAnchor="middle"
            >
              {props.abbr}
            </text>
            <text
              dy="6"
              fill={color}
              fontFamily="Lato"
              fontSize="10"
              textAnchor="middle"
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
                dy="18"
                fill={color}
                fontFamily="Lato"
                fontSize="10"
                textAnchor="middle"
              >
                {props.rank}
              </text>
            ) : null}
          </g>
        )}
      </MapGeneratorContext.Consumer>
    );
  } else {
    return null;
  }
};

export default Label;
