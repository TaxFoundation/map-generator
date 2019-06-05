import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { prodInitialState, devUSInitialState } from './Data';
import IDColumnReducer from './reducers/IDColumnReducer';
import ValueColumnReducer from './reducers/ValueColumnReducer';
import RankColumnReducer from './reducers/RankColumnReducer';

const reducer = (state, action) => {
  switch (action.id) {
    case 'idColumn':
      return IDColumnReducer(state, action);
    case 'valueColumn':
      return ValueColumnReducer(state, action);
    case 'rankColumn':
      return RankColumnReducer(state, action);
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
