import {
  isNumericData,
  isPercentageStringData,
  valueConvert,
  generateMapData,
} from '../../helpers';

const ValueColumnReducer = (state, action) => {
  if (state.idColumn && state.idColumn !== '¯\\_(ツ)_/¯') {
    const mapData = generateMapData(
      state.rawData,
      state.idColumn,
      action.value,
      state.rankColumn
    );
    let isNumeric = false;
    let { min, max, domain, formatType } = state;
    if (isNumericData(mapData)) {
      isNumeric = true;
      const values = mapData.map(d => valueConvert(d.value));
      min = Math.min(...values);
      max = Math.max(...values);
      domain = [min, max];
    }
    if (isPercentageStringData(state.rawData.map(row => row[action.value]))) {
      formatType = 'percent';
    }
    return {
      ...state,
      valueColumn: action.value,
      mapData,
      isNumeric,
      min,
      max,
      domain,
      formatType,
    };
  }
  return { ...state, valueColumn: action.value };
};

export default ValueColumnReducer;
