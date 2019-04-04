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
  mapData: null,
  columns: null,
  quantitative: {
    dataType: 'number',
    decimals: 0,
    comma: true,
    unit: 1,
    colorMode: 'lch',
    bins: 10,
  },
  qualitative: {},
  fontScale: 1,
};

const reducer = (state, action) => {
  if (action.id) {
    return { ...state, [action.id]: action.value };
  }
  return state;
};

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, updateData] = useReducer(reducer, initialState);
  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.any,
};
