import React from 'react';
import { geoAlbersUsa, geoPath, geoCentroid } from 'd3-geo';
import { feature } from 'topojson-client';
import chroma from 'chroma-js';
import Features from '../../data/us.json';
import Names from '../../data/states';

class USMap extends React.Component {
  constructor(props) {
    super(props);
    // takes type of states or counties

    this.state = {
      data: this.props.data || Names,
      colors: this.props.colors || ['#edf8b1', '#7fcdbb', '#2c7fb8'],
      domain: this.props.domain || [0, 0.5, 1],
      dataType: this.props.dataType || 'sequential',
      legendCount: this.props.legendCount || 10,
    };
    
    this.scale = 800;
    this.xScale = 600;
    this.yScale = 400;
    this.xScalar = this.xScale / 600;
    this.yScalar = this.yScale / 400;
    
    this.smallStates = {
      10: {
        x: 560 * this.xScalar,
        y: 160 * this.yScalar
      },
      11: {
        x: 560 * this.xScalar,
        y: 200 * this.yScalar
      },
      44: {
        x: 560 * this.xScalar,
        y: 120 * this.yScalar
      }
    };

    this.labelOverrides = {};
  }

  render() {
    const path = geoPath()
      .projection(
        geoAlbersUsa()
          .scale(this.scale)
          .translate([this.xScale/2, this.yScale/2 - 25])
      );
    const USDataFeatures = feature(Features, Features.objects[this.props.type]).features;
    const colorScale = chroma.scale(this.state.colors).domain(this.state.domain).mode('lch');

    const states = this.state.data.map((d) => {
      // Match state's path to the current state data
      let statePath = USDataFeatures.filter((s) => {
        return +s.id === +d.id;
      })[0];

      let isSmallState = false;
      let smallStateRect;
      let label;

      if (this.props.type === 'states') {
        let center = path.centroid(statePath);
  
        // Creat rect/label for small states
        if (d.id in this.smallStates) {
          isSmallState = true;
          let smallState = this.smallStates[d.id];
          smallStateRect = (
            <g>
              <rect
                x={smallState.x}
                y={smallState.y}
                height="16"
                width="16"
                fill={colorScale(d.value)}
                stroke='#ffffff'
                strokeLinejoin='bevel'
              />
              <text
                fontSize="12"
                textAnchor="middle"
                x={smallState.x + 8}
                y={smallState.y + 28}
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
            d={ path(statePath) }
            id={`state-${d.id}`}
            className='state'
            fill={colorScale(d.value)}
            stroke='#ffffff'
            strokeLinejoin='bevel'
          />
          { this.props.type === 'states'
            ? (isSmallState ? smallStateRect : label)
            : null
          }
        </g>
      );
    });

    const legend = [...Array(this.state.legendCount).keys()].map((d) => {
      const keyGap = 10;
      const keyWidth = (
        (
          (this.xScale / 2) / this.state.legendCount
        ) - keyGap
      ) * this.xScalar;

      return (
        <rect
          key={`legend-${d}`}
          fill={
            chroma.scale(this.state.colors)
              .domain([0, this.state.legendCount - 1])
              .mode('lch')(d)
          }
          height={20 * this.yScalar}
          width={keyWidth}
          x={(this.xScale / 2) + ((keyWidth + keyGap) * d)}
          y={380 * this.yScalar}
        ></rect>
      );
    });

    return (
      <div>
        <svg width="100%" viewBox={`0 0 ${this.xScale} ${this.yScale}`}>
          <g className='states'>
            { states }
          </g>
          <g className="legend">
            { legend }
          </g>
        </svg>
      </div>
    );
  }
}

export default USMap;
