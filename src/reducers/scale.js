function scale(state = null, action) {
  switch(action.type) {
  case 'UPDATE_SCALE':
    return action.scale;
  default:
    return state;
  }
}

export default scale;
