import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import STATES from '../data/states';

const initialState = {
  mapGeographyType: 'states',
  mapDataType: 'sequential',
  paletteId: 1,
  domain: null,
  idColumn: 'id',
  valueColumn: 'value',
  rankColumn: null,
  showRank: false,
  filename: null,
  rawData: null,
  mapData: null,
  columns: null,
  dataType: 'number',
  decimals: 0,
  comma: true,
  unit: 1,
  colorMode: 'lch',
  bins: 10,
  fontScale: 1,
};

const generateMapData = (rawData, id, value, rank = null) => {
  const mapData = rawData.map(d => {
    if (rank) {
      return { id: d[id], value: d[value], rank: d[rank] };
    }
    return { id: d[id], value: d[value] };
  });
  return mapData;
};

const reducer = (state, action) => {
  switch (action.id) {
    case 'idColumn': {
      const newMapData = generateMapData(
        state.rawData,
        action.value,
        state.valueColumn,
        state.rankColumn
      );
      return { ...state, idColumn: action.value, mapData: newMapData };
    }
    case 'valueColumn': {
      const newMapData = generateMapData(
        state.rawData,
        state.idColumn,
        action.value,
        state.rankColumn
      );
      let newDomain;
      if (!state.domain) {
        newDomain = [
          Math.min(newMapData.map(d => +d.value)),
          Math.max(newMapData.map(d => +d.value)),
        ];
        return {
          ...state,
          valueColumn: action.value,
          mapData: newMapData,
          domain: newDomain,
        };
      }
      return { ...state, valueColumn: action.value, mapData: newMapData };
    }
    case 'rankColumn': {
      const newMapData = generateMapData(
        state.rawData,
        state.idColumn,
        state.valueColumn,
        action.value
      );
      return { ...state, rankColumn: action.value, mapData: newMapData };
    }
    default:
      return { ...state, [action.id]: action.value };
  }
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
