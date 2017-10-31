import React from 'react';
import { geoAlbersUsa, geoPath } from 'd3-geo';
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
      scale: 800,
      xScale: 600,
      yScale: 400
    };

    this.xScalar = this.state.xScale / 600;
    this.yScalar = this.state.yScale / 400;
    
    this.smallStates = {
      10: {
        x: 560 * this.xScalar,
        y: 160 * this.yScalar,
        originX: 528 * this.xScalar,
        originY: 148 * this.yScalar
      },
      11: {
        x: 560 * this.xScalar,
        y: 200 * this.yScalar,
        originX: 509 * this.xScalar,
        originY: 152 * this.yScalar
      },
      44: {
        x: 560 * this.xScalar,
        y: 120 * this.yScalar,
        originX: 557 * this.xScalar,
        originY: 104 * this.yScalar
      }
    };

    this.projection = this.projection.bind(this);    
  }

  projection() {
    return geoAlbersUsa()
      .scale(this.state.scale)
      .translate([this.state.xScale/2, this.state.yScale/2 - 25]);
  }

  render() {
    const path = geoPath().projection(this.projection);
    const USDataFeatures = feature(Features, Features.objects[this.props.type]).features;
    const colorScale = chroma.scale(this.state.colors).domain(this.state.domain).mode('lch');

    const states = this.state.data.map((d) => {
      let statePath = USDataFeatures.filter((s) => {
        return +s.id === +d.id;
      })[0];
      let smallStateRect;
      if (d.id in this.smallStates) {
        let smallState = this.smallStates[d.id];
        smallStateRect = (
          <g>
            <line
              stroke="#666666"
              strokeWidth="1"
              x1={smallState.x + 3}
              y1={smallState.y + 3}
              x2={smallState.originX}
              y2={smallState.originY}
            />
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

      return (
        <g key={`state-${d.id}`}>
          <path
            d={ geoPath().projection(this.projection())(statePath) }
            id={`state-${d.id}`}
            className='state'
            fill={colorScale(d.value)}
            stroke='#ffffff'
            strokeLinejoin='bevel'
          />
          {smallStateRect}
        </g>
      );
    });

    const legend = [...Array(this.state.legendCount).keys()].map((d) => {
      const keyGap = 10;
      const keyWidth = (
        (
          (this.state.xScale / 2) / this.state.legendCount
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
          x={(this.state.xScale / 2) + ((keyWidth + keyGap) * d)}
          y={380 * this.yScalar}
        ></rect>
      );
    });

    return (
      <div>
        <svg width="100%" viewBox={`0 0 ${this.state.xScale} ${this.state.yScale}`}>
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
