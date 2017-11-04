function columnHeaders(state = [], action) {
  switch(action.type) {
  case 'UPDATE_ID':
    return action.id;
  default:
    return state;
  }
}

export default columnHeaders;
