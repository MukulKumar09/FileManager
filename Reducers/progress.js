export default function progress(state = {}, action) {
  if (action.type == 'SETPROGRESS') return action.payload;
  return state;
}
