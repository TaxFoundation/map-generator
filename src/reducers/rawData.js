function rawData(state = [], action) {
  switch(action.type) {
  case 'UPDATE_RAW_DATA':
    return action.rawData;
  default:
    return state;
  }
}

export default rawData;