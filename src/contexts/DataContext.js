import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { isNumericData } from '../helpers';

const initialState = {
  mapGeographyType: null,
  isNumeric: true,
  numericDataType: 'sequential',
  paletteId: 1,
  min: null,
  max: null,
  domain: null,
  idColumn: null,
  valueColumn: null,
  rankColumn: null,
  showRank: false,
  filename: null,
  rawData: null,
  mapData: null,
  columns: null,
  formatType: 'number',
  decimals: 0,
  comma: true,
  unit: 1,
  colorMode: 'lch',
  bins: 10,
  fontScale: 1,
  mapXScale: 600,
  mapYScale: 400,
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
      if (state.valueColumn) {
        const newMapData = generateMapData(
          state.rawData,
          action.value,
          state.valueColumn,
          state.rankColumn
        );
        return { ...state, idColumn: action.value, mapData: newMapData };
      }
      return { ...state, idColumn: action.value };
    }
    case 'valueColumn': {
      if (state.idColumn) {
        const newMapData = generateMapData(
          state.rawData,
          state.idColumn,
          action.value,
          state.rankColumn
        );
        let newIsNumeric = false;
        let newMin = state.min;
        let newMax = state.max;
        let newDomain = state.domain;
        if (isNumericData(newMapData)) {
          newIsNumeric = true;
          const values = newMapData.map(d => Number(d.value));
          newMin = Math.min(...values);
          newMax = Math.max(...values);
          newDomain = [newMin, newMax];
        }
        return {
          ...state,
          valueColumn: action.value,
          mapData: newMapData,
          isNumeric: newIsNumeric,
          min: newMin,
          max: newMax,
          domain: newDomain,
        };
      }
      return { ...state, valueColumn: action.value };
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
    default: {
      let newValue = action.value;
      if (action.value === '¯\\_(ツ)_/¯') newValue = null;
      return { ...state, [action.id]: newValue };
    }
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
