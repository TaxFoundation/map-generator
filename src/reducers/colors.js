function colors(state = [], action) {
  switch(action.type) {
  case 'UPDATE_COLORS':
    return action.colors
  default:
    return state;
  }
}

export default colors;