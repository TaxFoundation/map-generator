import { combineReducers } from 'redux';
import rawData from './rawData';
import rawColumnHeaders from './rawColumnHeaders';
import id from './id';
import value from './value';
import mapData from './mapData';
import mapType from './mapType';
import dataType from './dataType';
import colors from './colors';
import colorMode from './colorMode';
import domain from './domain';
import scale from './scale';
import steps from './steps';

const rootReducer = combineReducers({
  rawData,
  rawColumnHeaders,
  id,
  value,
  mapData,
  mapType,
  dataType,
  colors,
  colorMode,
  domain,
  scale,
  steps
});

export default rootReducer;
