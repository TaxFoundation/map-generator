import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';
import data from './data/states';

const defaultState = {
  mapData: data,
  mapType: 'states',
  columnHeaders: [''],
  colors: ['#edf8b1', '#2c7fb8'],
  domain: [0, 56],
  dataType: 'sequential',
  scale: 'linear',
  steps: 10,
};

const store = createStore(rootReducer, defaultState, composeWithDevTools());

export default store;