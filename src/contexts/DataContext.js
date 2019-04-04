import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  mapGeographyType: 'states',
  mapDataType: 'sequential',
  paletteId: 1,
  domain: null,
  idColumn: null,
  valueColumn: null,
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
        let newDomain;
        if (!state.domain) {
          newDomain = [
            Math.min(...newMapData.map(d => Number(d.value))),
            Math.max(...newMapData.map(d => Number(d.value))),
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
