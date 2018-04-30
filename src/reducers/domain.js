function domain(state = null, action) {
  switch (action.type) {
    case 'UPDATE_DOMAIN':
      return action.domain;
    default:
      return state;
  }
}

export default domain;
