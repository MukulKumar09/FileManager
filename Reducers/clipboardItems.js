export default function clipboardItems(
  state = {type: 'none', items: []},
  action,
) {
  switch (action.type) {
    case 'COPYTOCB': {
      return action.payload;
    }
    case 'DELETECB': {
      return {
        ...state.type,
        items: [...state.items.filter(item => item.path !== action.payload)],
      };
    }
    case 'CHANGETYPE': {
      return {...state.items, type: action.payload};
    }
    case 'CLEARCB': {
      return {type: 'none', items: []};
    }
  }
  return state;
}
