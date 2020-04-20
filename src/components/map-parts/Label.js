import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DataContext } from '../../contexts/DataContext';
import { formatter, labelColor } from '../../helpers';

const LabelText = styled.text`
  color: ${props => props.fill || '#4d4d4d'};
  font-family: 'Lato', sans-serif;
  font-size: ${props => props.fontSize || 10}px;
  font-weight: ${props => props.fontWeight || 400};
  text-anchor: ${props => props.textAnchor};
  user-select: none;
`;

const fontSize = (showRank, fontScale = 1) =>
  showRank ? 7.5 * fontScale : 10 * fontScale;

const offsets = (showRank, start) => {
  const offsetAmount = showRank ? 8 : 12;
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

const Label = ({ id, fill, rank, value, abbr, coordinates }) => {
  const { data: mapContext } = useContext(DataContext);

  const labelX = mapContext.showRank
    ? coordinates.labelXRank
    : coordinates.labelXNoRank;
  const labelY = mapContext.showRank
    ? coordinates.labelYRank
    : coordinates.labelYNoRank;
  const valueX = mapContext.showRank
    ? coordinates.valueXRank
    : coordinates.valueXNoRank;
  const valueY = mapContext.showRank
    ? coordinates.valueYRank
    : coordinates.valueYNoRank;

  const color = id === 15 ? '#4d4d4d' : labelColor(fill);

  return (
    <g>
      <LabelText
        x={labelX}
        y={labelY}
        fill={color}
        fontSize={fontSize(mapContext.showRank)}
        fontWeight="700"
        textAnchor="middle"
      >
        {abbr}
      </LabelText>
      <LabelText
        x={valueX}
        y={valueY}
        fill={color}
        fontSize={fontSize(mapContext.showRank)}
        textAnchor={
          coordinates.valueRankSameLine && mapContext.showRank
            ? 'end'
            : 'middle'
        }
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
      {rank && mapContext.showRank && (
        <LabelText
          x={coordinates.rankX}
          y={coordinates.rankY}
          fill={color}
          fontSize={fontSize(mapContext.showRank)}
          textAnchor={
            coordinates.valueRankSameLine && mapContext.showRank
              ? 'start'
              : 'middle'
          }
        >
          {`#${rank}`}
        </LabelText>
      )}
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
      {rank && mapContext.showRank && (
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
      )}
    </g>
  );
};

Label.propTypes = {
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
