export default (state = [], action) => {
  switch (action.type) {
    case "ADD_SIGNAL":
      return [...state, action.signal];
    case "REMOVE_SIGNAL":
    if (signal.createdBy === action.isAdmin) {
      return state.filter(signal => {
        signal.id !== action.id;
      });
    }
    return state;
    case "EDIT_SIGNAL":
      return state.map(signal => {
        if (signal.id === action.id && action.isAdmin) {
          return {
            ...signal,
            ...action.updates
          };
        } else {
          return signal;
        }
      });
    case "SET_SIGNALS":
      return action.signals;
    default:
      return state;
  }
};
