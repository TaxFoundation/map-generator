function mapData(state = null, action) {
  switch (action.type) {
    case 'UPDATE_MAP_DATA':
      return action.mapData;
    default:
      return state;
  }
}

export default mapData;
