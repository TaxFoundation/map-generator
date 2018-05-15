import React from 'react';
import MapGeneratorContext from '../../Context';
import { formatter, labelColor } from '../../helpers';

const fontSize = showRank => {
  return showRank ? 7 : 10;
};

function* offsets(showRank, start) {
  const offsetAmount = showRank ? 9 : 12;
  const adjustedStart = showRank ? start - 3 : start;
  if (showRank) {
    yield adjustedStart;
    yield adjustedStart + offsetAmount;
    yield adjustedStart + offsetAmount * 2;
  } else {
    yield adjustedStart;
    yield adjustedStart + offsetAmount;
  }
}

export const Label = props => {
  if (!isNaN(props.center[0]) && !isNaN(props.center[1])) {
    let labelX = props.center[0] + props.adjustment[0];
    let labelY = props.center[1] + props.adjustment[1] + 6;

    let color = props.id === 15 ? '#333' : labelColor(props.fill);

    return (
      <MapGeneratorContext.Consumer>
        {context => {
          const offsetGen = offsets(context.state.showRank, -6);

          return (
            <g transform={`translate(${labelX}, ${labelY})`}>
              <text
                dy={offsetGen.next().value}
                fill={color}
                fontFamily="Lato"
                fontSize={fontSize(context.state.showRank)}
                textAnchor="middle"
              >
                {props.abbr}
              </text>
              <text
                dy={offsetGen.next().value}
                fill={color}
                fontFamily="Lato"
                fontSize={fontSize(context.state.showRank)}
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
                  dy={offsetGen.next().value}
                  fill={color}
                  fontFamily="Lato"
                  fontSize={fontSize(context.state.showRank)}
                  textAnchor="middle"
                >
                  {`#${props.rank}`}
                </text>
              ) : null}
            </g>
          );
        }}
      </MapGeneratorContext.Consumer>
    );
  } else {
    return null;
  }
};

export const SmallStateRect = props => {
  const dimension = 24;
  const padding = 6;

  return (
    <MapGeneratorContext.Consumer>
      {context => {
        const offsetGen = offsets(context.state.showRank, -14);

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
              dy={offsetGen.next().value}
              fontFamily="Lato"
              fontSize={fontSize(context.state.showRank)}
              textAnchor="end"
              x={props.smallState.x - padding}
              y={props.smallState.y + dimension - 1}
            >
              {props.abbr}
            </text>
            <text
              dy={offsetGen.next().value}
              fontFamily="Lato"
              fontSize={fontSize(context.state.showRank)}
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
                dy={offsetGen.next().value}
                fontFamily="Lato"
                fontSize={fontSize(context.state.showRank)}
                textAnchor="end"
                x={props.smallState.x - padding}
                y={props.smallState.y + dimension - 1}
              >
                {`#${props.rank}`}
              </text>
            ) : null}
          </g>
        );
      }}
    </MapGeneratorContext.Consumer>
  );
};
