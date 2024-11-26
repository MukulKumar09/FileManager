export default function dragNDropIcon(state = {visible: 0}, action) {
  if (action.type == 'DRAGNDROPICON') return action.payload;
  return state;
}
