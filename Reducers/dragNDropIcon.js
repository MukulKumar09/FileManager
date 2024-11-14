export default function dragNDropIcon(state = 0, action) {
  if (action.type == 'DRAGNDROPICON') return action.payload;
  return state;
}
