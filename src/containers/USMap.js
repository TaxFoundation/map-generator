import React from 'react';
import { connect } from 'react-redux';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { colorScale } from '../helpers';
import Features from '../data/us.json';
import states from '../data/states';
import smallStateRects from '../data/smallStateRects';
import SmallStateRect from '../components/map/SmallStateRect';
import Label from '../components/map/Label';

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

      if (data !== undefined) {
        fill = colorScale(this.props.colors, this.props.domain, data.value);

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
            stroke="#ffffff"
            strokeLinejoin="bevel"
          />
          {this.props.mapType === 'states'
            ? isSmallState
              ? <SmallStateRect
                smallState={smallStateRects[d.id]}
                fill={fill}
                abbr={abbr}
              />
              : <Label 
                id={d.id}
                fill={fill}
                center={path.centroid(d)}
                abbr={abbr}
              />
            : null}
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
          fill={colorScale(this.props.colors, [0, this.props.steps - 1], d)}
          height={20 * this.yScalar}
          width={keyWidth}
          x={this.xScale / 2 + (keyWidth + keyGap) * d}
          y={380 * this.yScalar}
        />
      );
    });

    return (
      <div>
        <svg width="100%" viewBox={`0 0 ${this.xScale} ${this.yScale}`}>
          <g className="geographies">{geographies}</g>
          <g className="legend">{legend}</g>
        </svg>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mapData: state.mapData,
    mapType: state.mapType,
    domain: state.domain,
    scale: state.scale,
    colors: state.colors,
    steps: state.steps
  };
}

export default connect(mapStateToProps)(USMap);
