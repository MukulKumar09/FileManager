export default function tabs(state = {}, action) {
  switch (action.type) {
    case 'ADDTAB': {
      return {
        ...state,
        [action.payload.counter]: {
          item: {name: 'Home', path: 'Home'},
        },
      };
    }
    case 'UPDATETAB': {
      let tempState = {...state};
      tempState[action.payload.index]['item'] = action.payload.item;
      return tempState;
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
        0: {
          item: {name: 'Home', path: 'Home'},
        },
      };
    default:
      return state;
  }
}
