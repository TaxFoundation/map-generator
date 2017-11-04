function dataType(state = 'sequential', action) {
  switch (action.type) {
  case 'UPDATE_DATA_TYPE':
    return action.dataType;
  default:
    return state;
  }
}

export default dataType;