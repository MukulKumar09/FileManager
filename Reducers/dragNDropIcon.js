export default function dragNDropIcon(state = {}, action) {
  if (action.type == 'DRAGNDROPICON') return action.payload;
  return state;
}
