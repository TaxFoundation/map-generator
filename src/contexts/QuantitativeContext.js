import { createContext } from 'react';

const initialState = {
  dataType: 'number',
  decimals: 0,
  comma: true,
  unit: 1,
  colorMode: 'lch',
  bins: 10,
};

export const QuantitativeContext = createContext(initialState);

export const QuantitativeProvider = QuantitativeContext.Provider;
