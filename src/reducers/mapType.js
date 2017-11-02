function mapType(state = 'states', action) {
  switch(action.type) {
    case 'UPDATE_MAP_TYPE':
      return action.mapType;
    default:
      return state;
  }
};

export default mapType;