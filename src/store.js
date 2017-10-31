import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';
import data from './data/states';

const defaultState = {
  mapData: data,
  columnHeaders: [''],
  colors: ['#edf8b1', '#7fcdbb', '#2c7fb8'],
  domain: [0, 0.5, 1],
  dataType: 'sequential',
  scale: 'linear',
  steps: 10,
};

const store = createStore(rootReducer, defaultState, composeWithDevTools());

export default store;