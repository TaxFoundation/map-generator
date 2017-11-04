import { combineReducers } from 'redux';
import rawData from './rawData';
import rawColumnHeaders from './rawColumnHeaders';
import id from './id';
import mapData from './mapData';
import mapType from './mapType';
import dataType from './dataType';
import colors from './colors';
import domain from './domain';
import scale from './scale';
import steps from './steps';

const rootReducer = combineReducers({
  rawData,
  rawColumnHeaders,
  id,
  mapData,
  mapType,
  dataType,
  colors,
  domain,
  scale,
  steps
});

export default rootReducer;
