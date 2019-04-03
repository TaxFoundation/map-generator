import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import STATES from '../data/states';

const initialState = {
  mapGeographyType: 'states',
  mapDataType: 'sequential',
  paletteId: 1,
  domain: [
    Math.min(...STATES.map(s => s.value)),
    Math.max(...STATES.map(s => s.value)),
  ],
  idColumn: 'id',
  valueColumn: 'value',
  rankColumn: 'rank',
  showRank: false,
  mapData: STATES,
  quantitative: {
    dataType: 'number',
    decimals: 0,
    comma: true,
    unit: 1,
    colorMode: 'lch',
    bins: 10,
  },
  qualitative: {},
};

const reducer = (state, action) => {
  switch (action.do) {
    case 'update':
      return { ...state, [action.id]: action.value };
    default:
      return state;
  }
};

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, updateData] = useReducer(reducer, initialState);
  const value = { data, updateData };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

DataProvider.propTypes = {
  children: PropTypes.any,
};
