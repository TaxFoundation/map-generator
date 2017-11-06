function colors(state = null, action) {
  switch (action.type) {
  case 'UPDATE_COLOR_MODE':
    return action.colorMode;
  default:
    return state;
  }
}

export default colors;