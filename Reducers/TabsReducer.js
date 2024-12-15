export default function tabs(state = {}, action) {
  switch (action.type) {
    case 'ADDTAB': {
      return {
        ...state,
        [action.payload.counter]: {
          name: 'Home',
          path: 'Home',
          isTabberPath: true,
        },
      };
    }
    case 'ADDTABFROMITEM': {
      return {
        ...state,
        [action.payload.counter]: action.payload.item,
      };
    }
    case 'UPDATETAB': {
      return {...state, [action.payload.index]: action.payload.item};
    }
    case 'DELETETAB': {
      let tempState = {...state};
      delete tempState[action.payload];
      return tempState;
    }
    case 'DELETEOTHERTABS':
      return {
        [action.payload]: state[action.payload],
      };
    case 'RESETTABS':
      return {
        0: {name: 'Home', path: 'Home', isTabberPath: true},
      };
    default:
      return state;
  }
}
