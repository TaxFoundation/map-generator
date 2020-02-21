import React, { useContext, useEffect, useState } from 'react';
import { geoConicConformal, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';

import { DataContext } from '../../contexts/DataContext';
import EUROPE from '../../data/europe';
import { colorScale, getPalette } from '../../helpers';
import Features from '../../data/europe.json';
import adjustments from '../../data/adjustments';
import smallStateRects from '../../data/smallStateRects';
import { Label, SmallStateRect } from '../map-parts/Label';

const Countries = () => {
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
  const scale = 500;
  const xScale = mapContext.mapXScale;
  const yScale = mapContext.mapYScale;
  const xScalar = xScale / 600;
  const yScalar = yScale / 400;
  // Select correct palette for fills
  let palette;
  if (mapContext.isNumeric) {
    palette = getPalette(mapContext.paletteId, mapContext.numericDataType);
  } else {
    palette = getPalette(mapContext.paletteId, 'qualitative');
  }
  // Construct the path object
  const path = geoPath().projection(
    geoConicConformal()
      .scale(scale)
      .translate([150, 700])
  );
  const EuropeDataFeatures = feature(
    Features,
    Features.objects[mapContext.mapGeographyType]
  ).features;

  // Create geographies with fills
  const geographies = EuropeDataFeatures.map(d => {
    // Match country's path to the current country data
    let data;
    let domain;
    if (mapContext.mapData) {
      data = mapContext.mapData.find(s => {
        if (
          +s.id === +d.properties.iso_n3 ||
          s.id === d.properties.iso_a3 ||
          s.id === d.properties.iso_a2
        ) {
          return true;
        }
        return false;
      });
      domain = mapContext.domain;
    } else {
      data = EUROPE.find(s => {
        if (
          +s.id === +d.properties.iso_n3 ||
          s.id === d.properties.iso_a3 ||
          s.id === d.properties.iso_a2
        ) {
          return true;
        }
        return false;
      });
      domain = [1, 58];
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
          id={`geography-${d.properties.iso_n3}`}
          key={`geography-${d.properties.iso_n3}`}
          className="state"
          fill={fill}
          stroke="#ffffff"
          strokeLinejoin="bevel"
        />
      );
    }

    return null;
  });

  const labels = EuropeDataFeatures.map(d => {
    // Match state's path to the current state data
    let data;
    let domain;
    if (mapContext.mapData) {
      data = mapContext.mapData.find(s => {
        if (
          +s.id === +d.properties.iso_n3 ||
          s.id === d.properties.iso_a3 ||
          s.id === d.properties.iso_a2
        ) {
          return true;
        }
        return false;
      });
      domain = mapContext.domain;
    } else {
      data = EUROPE.find(s => {
        if (
          +s.id === +d.properties.iso_n3 ||
          s.id === d.properties.iso_a3 ||
          s.id === d.properties.iso_a2
        ) {
          return true;
        }
        return false;
      });
      domain = [1, 50];
    }

    const isSmallState = false;
    let fill = '#777777';
    const adjustment = [0, 0];

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
      // if (d.id in smallStateRects) {
      //   isSmallState = true;
      // }

      // if (d.id in adjustments) {
      //   adjustment = adjustments[d.id];
      // }
      return isSmallState ? (
        <SmallStateRect
          key={`ssr-${d.properties.iso_n3}`}
          smallState={smallStateRects[d.properties.iso_n3]}
          fill={fill}
          abbr={EUROPE.find(s => +s.id === +d.properties.iso_n3).iso_a2}
          value={data.value}
          rank={data.rank || null}
        />
      ) : (
        <Label
          key={`label-${d.properties.iso_n3}`}
          id={+d.properties.iso_n3}
          fill={fill}
          center={path.centroid(d)}
          adjustment={adjustment}
          bounds={bounds}
          abbr={EUROPE.find(s => +s.id === +d.properties.iso_n3).iso_a2}
          value={data.value}
          rank={+data.rank || null}
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
        <g className="geographies"> {geographies} </g>{' '}
        <g className="labels"> {labels} </g>{' '}
        <g className="legend"> {legend} </g>{' '}
      </svg>{' '}
    </div>
  );
};

export default Countries;
