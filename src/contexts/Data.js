import STATES from '../data/states';

const prodInitialState = {
  mapGeographyType: null,
  isNumeric: true,
  numericDataType: 'sequential',
  paletteId: 1,
  paletteDirectionFlipped: false,
  min: null,
  max: null,
  domain: null,
  idColumn: null,
  valueColumn: null,
  rankColumn: null,
  showRank: false,
  filename: null,
  rawData: null,
  mapData: null,
  columns: null,
  formatType: 'number',
  decimals: 0,
  comma: true,
  unit: 1,
  colorMode: 'lch',
  bins: 10,
  fontScale: 1,
  mapXScale: 600,
  mapYScale: 400,
};

const devUSInitialState = {
  mapGeographyType: 'states',
  isNumeric: true,
  numericDataType: 'sequential',
  paletteId: 1,
  paletteDirectionFlipped: false,
  min: 1,
  max: 56,
  domain: [1, 56],
  idColumn: 'id',
  valueColumn: 'value',
  rankColumn: null,
  showRank: false,
  filename: null,
  rawData: STATES,
  mapData: STATES.map(s => ({ id: s.id, value: s.value })),
  columns: ['id', 'abbr', 'name', 'value'],
  formatType: 'number',
  decimals: 0,
  comma: true,
  unit: 1,
  colorMode: 'lch',
  bins: 10,
  fontScale: 1,
  mapXScale: 600,
  mapYScale: 400,
};

export { prodInitialState, devUSInitialState };
