import React from 'react';
import PropTypes from 'prop-types';
import MapGeneratorContext from '../Context';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { colorScale } from '../helpers';
import Features from '../data/us.json';
import states from '../data/states';
import smallStateRects from '../data/smallStateRects';
import SmallStateRect from '../components/map/SmallStateRect';
import Label from '../components/map/Label';
import StateOutlines from '../components/map/StateOutlines';

class USMap extends React.Component {
  constructor(props) {
    super(props);

    this.scale = 800;
    this.xScale = 600;
    this.yScale = 400;
    this.xScalar = this.xScale / 600;
    this.yScalar = this.yScale / 400;
  }

  render() {
    const path = geoPath().projection(
      geoAlbersUsa()
        .scale(this.scale)
        .translate([this.xScale / 2, this.yScale / 2 - 25])
    );
    const USDataFeatures = feature(
      Features,
      Features.objects[this.props.mapType]
    ).features;

    const geographies = USDataFeatures.map(d => {
      // Match state's path to the current state data
      let data = this.props.mapData.find(s => {
        return +s.id === +d.id;
      });

      let fill = '#777777';
      let isSmallState = false;
      let abbr;
      let value = '';

      if (data !== undefined) {
        value = data.value;
        fill = colorScale(
          this.props.colors,
          this.props.domain,
          data.value,
          this.props.steps,
          this.props.colorMode
        );

        if (this.props.mapType === 'states') {
          abbr = states.filter(s => +s.id === +data.id)[0]['abbr'];

          // Creat rect/label for small states
          if (d.id in smallStateRects) {
            isSmallState = true;
          }
        }
      }

      return (
        <g key={`geo-${d.id}`}>
          <path
            d={path(d)}
            id={`geography-${d.id}`}
            className="state"
            fill={fill}
            stroke={this.props.mapType === 'states' ? '#ffffff' : 'none'}
            strokeLinejoin="bevel"
          />
          {this.props.mapType === 'states' ? (
            isSmallState ? (
              <SmallStateRect
                smallState={smallStateRects[d.id]}
                fill={fill}
                abbr={abbr}
              />
            ) : (
              <Label
                id={d.id}
                fill={fill}
                center={path.centroid(d)}
                abbr={abbr}
                value={value}
              />
            )
          ) : null}
        </g>
      );
    });

    const legend = [...Array(this.props.steps).keys()].map(d => {
      const keyGap = 10;
      const keyWidth =
        (this.xScale / 2 / this.props.steps - keyGap) * this.xScalar;

      return (
        <rect
          key={`legend-${d}`}
          fill={colorScale(
            this.props.colors,
            [0, this.props.steps - 1],
            d,
            this.props.steps,
            this.props.colorMode
          )}
          height={20 * this.yScalar}
          width={keyWidth}
          x={this.xScale / 2 + (keyWidth + keyGap) * d}
          y={380 * this.yScalar}
        />
      );
    });

    return (
      <div>
        <svg
          id="generated-map"
          width="100%"
          viewBox={`0 0 ${this.xScale} ${this.yScale}`}
        >
          <g className="geographies">{geographies}</g>
          <g className="legend">{legend}</g>
          {this.props.mapType === 'counties' ? (
            <g className="state-outlines">
              <StateOutlines path={path} />
            </g>
          ) : null}
        </svg>
      </div>
    );
  }
}

USMap.propTypes = {
  colorMode: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
  domain: PropTypes.arrayOf(PropTypes.number),
  mapData: PropTypes.arrayOf(PropTypes.object),
  mapType: PropTypes.string,
  steps: PropTypes.number,
};

export default USMap;
