import { createContext } from 'react';

import STATES from '../data/states';

const initialState = {
  mapGeographyType: 'states',
  mapDataType: 'sequential',
  paletteId: 1,
  domain: [
    Math.min(...STATES.map(s => s.value)),
    Math.max(...STATES.map(s => s.value)),
  ],
  idColumn: 'id',
  valueColumn: 'value',
  rankColumn: 'rank',
  showRank: false,
  mapData: STATES,
};

export const DataContext = createContext(initialState);

export const DataProvider = DataContext.Provider;
