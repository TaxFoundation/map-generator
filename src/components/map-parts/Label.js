import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DataContext } from '../../contexts/DataContext';
import { formatter, labelColor } from '../../helpers';

const LabelText = styled.text`
  color: ${props => props.fill || '#333'};
  font-family: 'Lato', sans-serif;
  font-size: ${props => props.fontSize || 10}px;
  font-weight: ${props => props.fontWeight || 400};
  text-anchor: middle;
  user-select: none;
`;

const fontSize = (showRank, fontScale = 1) =>
  showRank ? 8.5 * fontScale : 10 * fontScale;

const offsets = (showRank, start) => {
  const offsetAmount = showRank ? 10 : 12;
  const adjustedStart = showRank ? start - 3 : start;
  if (showRank) {
    return [
      adjustedStart,
      adjustedStart + offsetAmount,
      adjustedStart + offsetAmount * 2,
    ];
  }
  return [adjustedStart, adjustedStart + offsetAmount];
};

const Label = props => {
  const [dragging, setDragging] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const { data: mapContext } = useContext(DataContext);
  const { center, adjustment, id, fill, rank, value, abbr } = props;
  if (Number.isNaN(center[0]) || Number.isNaN(center[1])) return null;

  const labelX = center[0] + adjustment[0] + coordinates.x;
  const labelY = center[1] + adjustment[1] + coordinates.y + 6;
  const color = id === 15 ? '#333' : labelColor(fill);
  const offsetGen = offsets(mapContext.showRank, -6);

  return (
    <g
      transform={`translate(${labelX}, ${labelY})`}
      onMouseDown={e => {
        setOrigin({ x: e.clientX, y: e.clientY });
        setDragging(true);
      }}
      onMouseMove={e => {
        if (dragging) {
          setCoordinates({
            x: e.clientX - origin.x,
            y: e.clientY - origin.y,
          });
          // Scale this with getBBox() and SVG size
        }
      }}
      onMouseUp={() => {
        setDragging(false);
      }}
    >
      <LabelText
        dy={offsetGen[0]}
        fill={color}
        fontSize={fontSize(mapContext.showRank)}
        fontWeight="700"
      >
        {abbr}
      </LabelText>
      <LabelText
        dy={offsetGen[1]}
        fill={color}
        fontSize={fontSize(mapContext.showRank)}
      >
        {formatter(
          {
            format: mapContext.formatType,
            decimals: mapContext.decimals,
            comma: mapContext.comma,
            unit: mapContext.unit,
          },
          value
        )}
      </LabelText>
      {rank && mapContext.showRank ? (
        <LabelText
          dy={offsetGen[2]}
          fill={color}
          fontSize={fontSize(mapContext.showRank)}
        >
          {`#${rank}`}
        </LabelText>
      ) : null}
    </g>
  );
};

const SmallStateRect = props => {
  const { data: mapContext } = useContext(DataContext);
  const dimension = 24;
  const padding = 6;
  const offsetGen = offsets(mapContext.showRank, -14);
  const { smallState, fill, value, abbr, rank } = props;

  return (
    <g>
      <rect
        x={smallState.x}
        y={smallState.y}
        height={dimension}
        width={dimension}
        fill={fill}
        stroke="#ffffff"
        strokeLinejoin="bevel"
      />
      <text
        dy={offsetGen[0]}
        fontFamily="Lato"
        fontSize={fontSize(mapContext.showRank)}
        fontWeight="700"
        textAnchor="end"
        x={smallState.x - padding}
        y={smallState.y + dimension - 1}
      >
        {abbr}
      </text>
      <text
        dy={offsetGen[1]}
        fontFamily="Lato"
        fontSize={fontSize(mapContext.showRank)}
        textAnchor="end"
        x={smallState.x - padding}
        y={smallState.y + dimension - 1}
      >
        {formatter(
          {
            format: mapContext.formatType,
            decimals: mapContext.decimals,
            comma: mapContext.comma,
            unit: mapContext.unit,
          },
          value
        )}
      </text>
      {rank && mapContext.showRank ? (
        <text
          dy={offsetGen[2]}
          fontFamily="Lato"
          fontSize={fontSize(mapContext.showRank)}
          textAnchor="end"
          x={smallState.x - padding}
          y={smallState.y + dimension - 1}
        >
          {abbr === 'DC' ? `(#${rank})` : `#${rank}`}
        </text>
      ) : null}
    </g>
  );
};

Label.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number),
  adjustment: PropTypes.arrayOf(PropTypes.number),
  id: PropTypes.number,
  fill: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  rank: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  abbr: PropTypes.string,
};

SmallStateRect.propTypes = {
  smallState: PropTypes.object,
  fill: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  rank: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  abbr: PropTypes.string,
};

export { Label, SmallStateRect };
