function updateId(state = null, action) {
  switch (action.type) {
    case 'UPDATE_ID':
      return action.id;
    default:
      return state;
  }
}

export default updateId;
