import React, { useContext } from 'react';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';

import { DataContext } from '../../contexts/DataContext';
import { colorScale, getPalette } from '../../helpers';
import Features from '../../data/us.json';
import adjustments from '../../data/adjustments';
import smallStateRects from '../../data/smallStateRects';
import { Label, SmallStateRect } from '../map-parts/Label';

const States = () => {
  const { data: mapContext } = useContext(DataContext);

  // Set initial dimensions and scaling
  const scale = 780;
  const xScale = 600;
  const yScale = 400;
  const xScalar = xScale / 600;
  const yScalar = yScale / 400;
  // Select correct palette for fills
  const palette = getPalette(mapContext.paletteId, mapContext.mapDataType);
  // Construct the path object
  const path = geoPath().projection(
    geoAlbersUsa()
      .scale(scale)
      .translate([xScale / 2, yScale / 2 - 25])
  );
  const USDataFeatures = feature(
    Features,
    Features.objects[mapContext.mapGeographyType]
  ).features;

  // Create geographies with fills
  const geographies = USDataFeatures.map(d => {
    // Match state's path to the current state data
    const data = mapContext.mapData.find(s => +s.id === +d.id);

    let fill = '#777777';

    if (data !== undefined) {
      fill = colorScale(
        palette,
        mapContext.domain,
        data.value,
        mapContext.quantitative.bins,
        mapContext.quantitative.colorMode
      );
    }

    return (
      <path
        d={path(d)}
        id={`geography-${d.id}`}
        key={`geography-${d.id}`}
        className="state"
        fill={fill}
        stroke="#ffffff"
        strokeLinejoin="bevel"
      />
    );
  });

  const labels = USDataFeatures.map(d => {
    // Match state's path to the current state data
    const { abbr, value, rank } =
      mapContext.mapData.find(s => +s.id === +d.id) || 2;

    let isSmallState = false;
    let fill = '#777777';
    let adjustment = [0, 0];

    if (value !== undefined) {
      fill = colorScale(
        palette,
        mapContext.domain,
        value,
        mapContext.quantitative.bins,
        mapContext.quantitative.colorMode
      );

      // Creat rect/label for small states
      if (d.id in smallStateRects) {
        isSmallState = true;
      }

      if (d.id in adjustments) {
        adjustment = adjustments[d.id];
      }
    }

    return isSmallState ? (
      <SmallStateRect
        key={`ssr-${d.id}`}
        smallState={smallStateRects[d.id]}
        fill={fill}
        abbr={abbr}
        value={value}
        rank={rank || null}
      />
    ) : (
      <Label
        key={`label-${d.id}`}
        id={d.id}
        fill={fill}
        center={path.centroid(d)}
        adjustment={adjustment}
        abbr={abbr}
        value={value}
        rank={rank || null}
      />
    );
  });

  const legend = [...Array(mapContext.quantitative.bins).keys()].map(d => {
    const keyGap = 10;
    const keyWidth =
      (xScale / 2 / mapContext.quantitative.bins - keyGap) * xScalar;

    return (
      <rect
        key={`legend-${d}`}
        fill={colorScale(
          palette,
          [0, mapContext.quantitative.bins - 1],
          d,
          mapContext.quantitative.bins,
          mapContext.quantitative.colorMode
        )}
        height={20 * yScalar}
        width={keyWidth}
        x={xScale / 2 + (keyWidth + keyGap) * d}
        y={380 * yScalar}
      />
    );
  });

  return (
    <div>
      <svg id="generated-map" width="100%" viewBox={`0 0 ${xScale} ${yScale}`}>
        <g className="geographies">{geographies}</g>
        <g className="labels">{labels}</g>
        <g className="legend">{legend}</g>
      </svg>
    </div>
  );
};

export default States;
