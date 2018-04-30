function updateValue(state = null, action) {
  switch (action.type) {
    case 'UPDATE_VALUE':
      return action.value;
    default:
      return state;
  }
}

export default updateValue;
