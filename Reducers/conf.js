export default function cache(state = {}, action) {
  switch (action.type) {
    case 'SETCONF': {
      return action.payload;
    }
    case 'UPDATECONF':
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      return state;
  }
}
