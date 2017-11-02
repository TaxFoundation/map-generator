function steps(state = [], action) {
  switch(action.type) {
    case 'UPDATE_STEPS':
      return action.steps;
    default:
      return state;
  }
}

export default steps;
