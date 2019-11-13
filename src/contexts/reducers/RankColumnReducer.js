import { generateMapData } from '../../helpers';

const RankColumnReducer = (state, action) => {
  const newMapData = generateMapData(
    state.rawData,
    state.idColumn,
    state.valueColumn,
    action.value
  );
  return { ...state, rankColumn: action.value, mapData: newMapData };
};

export default RankColumnReducer;
