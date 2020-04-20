import { generateMapData } from '../../helpers';

const IDColumnReducer = (state, action) => {
  if (state.valueColumn && state.valueColumn !== '¯\\_(ツ)_/¯') {
    const newMapData = generateMapData(
      state.rawData,
      action.value,
      state.valueColumn,
      state.rankColumn
    );
    return { ...state, idColumn: action.value, mapData: newMapData };
  }
  return { ...state, idColumn: action.value };
};

export default IDColumnReducer;
