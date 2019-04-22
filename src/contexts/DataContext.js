import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { prodInitialState, devUSInitialState } from './Data';
import { isNumericData, generateMapData } from '../helpers';
import ValueColumnReducer from './reducers/ValueColumnReducer';

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
    case 'valueColumn':
      return ValueColumnReducer(state, action);
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
  const [data, updateData] = useReducer(reducer, devUSInitialState);
  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.any,
};
