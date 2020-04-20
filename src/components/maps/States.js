import React, { useContext, useEffect, useState } from 'react';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';

import { DataContext } from '../../contexts/DataContext';
import STATES from '../../data/states';
import { colorScale, directedPalette, getPalette } from '../../helpers';
import Features from '../../data/us.json';
import allCoordinates from '../../data/us-label-coordinates.json';
import smallStateRects from '../../data/smallStateRects';
import { Label, SmallStateRect } from '../map-parts/Label';

const States = () => {
  const { data: mapContext } = useContext(DataContext);
  const [bounds, setBounds] = useState({
    width: mapContext.mapXScale / mapContext.mapXScale,
    height: mapContext.mapYScale / mapContext.mapYScale,
  });
  useEffect(() => {
    const { width, height } = document
      .getElementById('generated-map')
      .getBoundingClientRect();
    setBounds({
      width: mapContext.mapXScale / width,
      height: mapContext.mapYScale / height,
    });
  }, [mapContext.mapXScale, mapContext.mapYScale]);

  // Set initial dimensions and scaling
  const scale = 780;
  const xScale = mapContext.mapXScale;
  const yScale = mapContext.mapYScale;
  const xScalar = xScale / 600;
  const yScalar = yScale / 400;
  // Select correct palette for fills
  let palette;
  if (mapContext.isNumeric) {
    palette = directedPalette(
      getPalette(mapContext.paletteId, mapContext.numericDataType),
      mapContext.paletteDirectionFlipped
    );
  } else {
    palette = directedPalette(
      getPalette(mapContext.paletteId, 'qualitative'),
      mapContext.paletteDirectionFlipped
    );
  }
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
    let data;
    let domain;
    if (mapContext.mapData) {
      data = mapContext.mapData.find(s => +s.id === +d.id);
      domain = mapContext.domain;
    } else {
      data = STATES.find(s => +s.id === +d.id);
      domain = [1, 50];
    }

    let fill = '#777777';

    if (data !== undefined) {
      if (mapContext.isNumeric) {
        fill = colorScale(
          palette,
          domain,
          data.value,
          mapContext.bins,
          mapContext.colorMode
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
    }

    return null;
  });

  const labels = USDataFeatures.map(d => {
    // Match state's path to the current state data
    let data;
    let domain;
    if (mapContext.mapData) {
      data = mapContext.mapData.find(s => +s.id === +d.id);
      domain = mapContext.domain;
    } else {
      data = STATES.find(s => +s.id === +d.id);
      domain = [1, 50];
    }

    let isSmallState = false;
    let fill = '#777777';

    if (data !== undefined) {
      if (mapContext.isNumeric) {
        fill = colorScale(
          palette,
          domain,
          data.value,
          mapContext.bins,
          mapContext.colorMode
        );
      }

      // Creat rect/label for small states
      if (d.id in smallStateRects) {
        isSmallState = true;
      }

      return isSmallState ? (
        <SmallStateRect
          key={`ssr-${d.id}`}
          smallState={smallStateRects[d.id]}
          fill={fill}
          abbr={STATES.find(s => +s.id === +d.id).abbr}
          value={data.value}
          rank={data.rank || null}
        />
      ) : (
        <Label
          key={`label-${d.id}`}
          id={d.id}
          fill={fill}
          abbr={STATES.find(s => +s.id === +d.id).abbr}
          value={data.value}
          rank={data.rank || null}
          coordinates={allCoordinates.find(coord => coord.id === d.id)}
        />
      );
    }

    return null;
  });

  const legend = [...Array(mapContext.bins).keys()].map(d => {
    const keyGap = 10;
    const keyWidth = (xScale / 2 / mapContext.bins - keyGap) * xScalar;
    return (
      <rect
        key={`legend-${d}`}
        fill={colorScale(
          palette,
          [0, mapContext.bins - 1],
          d,
          mapContext.bins,
          mapContext.colorMode
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
      <svg id="generated-map" viewBox={`0 0 ${xScale} ${yScale}`}>
        <g className="geographies">{geographies}</g>
        <g className="labels">{labels}</g>
        <g className="legend">{legend}</g>
      </svg>
    </div>
  );
};

export default States;
