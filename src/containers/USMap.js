import React from 'react';
import { connect } from 'react-redux';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { colorScale, labelColor } from '../helpers';
import Features from '../data/us.json';

class USMap extends React.Component {
  constructor(props) {
    super(props);

    this.scale = 800;
    this.xScale = 600;
    this.yScale = 400;
    this.xScalar = this.xScale / 600;
    this.yScalar = this.yScale / 400;

    this.smallStates = {
      10: {
        x: 560,
        y: 160
      },
      11: {
        x: 560,
        y: 200
      },
      44: {
        x: 560,
        y: 120
      }
    };

    this.labelOverrides = {};
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

    const geographies = this.props.mapData.map(d => {
      // Match state's path to the current state data
      let statePath = USDataFeatures.filter(s => {
        return +s.id === +d.id;
      })[0];

      let fill = colorScale(this.props.colors, this.props.domain)(d.value);
      let isSmallState = false;
      let smallStateRect;
      let label;

      if (this.props.mapType === 'states') {
        let center = path.centroid(statePath);

        // Creat rect/label for small states
        if (d.id in this.smallStates) {
          isSmallState = true;
          let smallState = this.smallStates[d.id];

          // TODO factor into FSC
          smallStateRect = (
            <g>
              <rect
                x={smallState.x * this.xScalar}
                y={smallState.y * this.yScalar}
                height="16"
                width="16"
                fill={fill}
                stroke="#ffffff"
                strokeLinejoin="bevel"
              />
              <text
                fontSize="12"
                textAnchor="middle"
                x={smallState.x * this.xScalar + 8}
                y={smallState.y * this.yScalar + 28}
              >
                {d.abbr}
              </text>
            </g>
          );
        }

        // Create state labels
        let labelX = center[0];
        let labelY = center[1] + 6;
        if (d.id in this.labelOverrides) {
          labelX = this.labelOverrides[d.id].x;
          labelY = this.labelOverrides[d.id].y;
        }

        label = (
          <text
            fill={labelColor(fill)}
            fontSize="12"
            textAnchor="middle"
            x={labelX}
            y={labelY}
          >
            {d.abbr}
          </text>
        );
      }

      return (
        <g key={`geo-${d.id}`}>
          <path
            d={path(statePath)}
            id={`state-${d.id}`}
            className="state"
            fill={fill}
            stroke="#ffffff"
            strokeLinejoin="bevel"
          />
          {this.props.mapType === 'states'
            ? isSmallState ? smallStateRect : label
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
          fill={colorScale(this.props.colors, [0, this.props.steps - 1])(d)}
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
          <g className="states">{geographies}</g>
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
