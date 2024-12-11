export default function media(state = 0, action) {
  if (action.type == 'SETMEDIA') return action.payload;
  return state;
}
