import { createContext } from 'react';

import STATES from '../../data/states';

export const DataContext = createContext(STATES);

export const DataProvider = DataContext.Provider;
