import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';
import data from './data/states';

const defaultData = data.map(d => {
  return { id: d.id, value: d.value };
});

const defaultState = {
  colorMode: 'lch',
  colors: ['#edf8b1', '#2c7fb8'],
  dataType: 'sequential',
  domain: [0, 56],
  id: 'id',
  mapData: defaultData,
  mapType: 'states',
  rawColumnHeaders: ['id', 'abbr', 'name', 'value'],
  rawData: data,
  scale: 'linear',
  steps: 10,
  value: 'value',
};

const store = createStore(rootReducer, defaultState, composeWithDevTools());

export default store;
