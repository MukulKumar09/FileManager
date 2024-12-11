export default function media(state = false, action) {
  if (action.type == 'SETMEDIA') return action.payload;
  return state;
}
