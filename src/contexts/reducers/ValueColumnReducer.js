import { isNumericData, generateMapData } from '../../helpers';

const ValueColumnReducer = (state, action) => {
  if (state.idColumn) {
    const newMapData = generateMapData(
      state.rawData,
      state.idColumn,
      action.value,
      state.rankColumn
    );
    let newIsNumeric = false;
    let newMin = state.min;
    let newMax = state.max;
    let newDomain = state.domain;
    if (isNumericData(newMapData)) {
      newIsNumeric = true;
      const values = newMapData.map(d => Number(d.value));
      newMin = Math.min(...values);
      newMax = Math.max(...values);
      newDomain = [newMin, newMax];
    }
    return {
      ...state,
      valueColumn: action.value,
      mapData: newMapData,
      isNumeric: newIsNumeric,
      min: newMin,
      max: newMax,
      domain: newDomain,
    };
  }
  return { ...state, valueColumn: action.value };
};

export default ValueColumnReducer;
