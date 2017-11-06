function rawColumnHeaders(state = null, action) {
  switch(action.type) {
  case 'UPDATE_RAW_COLUMN_HEADERS':
    return action.rawColumnHeaders;
  default:
    return state;
  }
}

export default rawColumnHeaders;