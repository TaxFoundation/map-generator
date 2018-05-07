import React from 'react';
import MapGeneratorContext from '../../Context';
import { formatter, labelColor } from '../../helpers';

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
      <MapGeneratorContext.Consumer>
        {context => (
          <g transform={`translate(${labelX}, ${labelY})`}>
            <text
              dy="-6"
              fill={labelColor(props.fill)}
              fontFamily="Lato"
              fontSize="10"
              textAnchor="middle"
            >
              {props.abbr}
            </text>
            <text
              dy="6"
              fill={labelColor(props.fill)}
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
          </g>
        )}
      </MapGeneratorContext.Consumer>
    );
  } else {
    return null;
  }
};

export default Label;
