export default function clipboardItems(state = [], action) {
  switch (action.type) {
    case 'COPYTOCB': {
      return action.payload;
    }
    case 'DELETECB': {
      return [...state].filter(item => item.path !== action.payload);
    }
    case 'CLEARCB': {
      return [];
    }
  }
  return state;
}
