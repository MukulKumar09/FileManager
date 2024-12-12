export default function modalStack(state = [], action) {
  switch (action.type) {
    case 'PUSHMODALSTACK': {
      const tempState = [...state];
      tempState.push(action.payload);
      return tempState;
    }
    case 'UPDATEPROGRESSMODALSTACK': {
      const tempState = [...state];
      tempState[0] = action.payload;
      return tempState;
    }
    case 'POPMODALSTACK': {
      const tempState = [...state];
      tempState.pop();
      return tempState;
    }
    default:
      return state;
  }
}
