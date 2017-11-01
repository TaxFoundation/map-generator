import { combineReducers } from 'redux';
import mapData from './mapData';
import dataType from './dataType';
import colors from './colors';
import columnHeaders from './columnHeaders';
import domain from './domain';
import scale from './scale';
import steps from './steps';

const rootReducer = combineReducers({
  mapData,
  dataType,
  colors,
  columnHeaders,
  domain,
  scale,
  steps
});

export default rootReducer;
