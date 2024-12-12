export default function refreshPath(state = 0, action) {
  if (action.type == 'SETREFRESHPATH') return action.payload;
  return state;
}
