import React from 'react';
import { feature } from 'topojson-client';
import Features from '../../data/us.json';
import states from '../../data/states';

const StateOutlines = props => {
  const paths = feature(Features, Features.objects['states']).features;

  return states.map(theState => {
    return (
      <path
        key={`outline-${theState.id}`}
        d={props.path(paths.find(p => +p.id === +theState.id))}
        fill="none"
        stroke="#ffffff"
        strokeLinejoin="bevel"
      />
    );
  });
};

export default StateOutlines;
