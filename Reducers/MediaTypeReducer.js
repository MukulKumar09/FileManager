export default function mediaType(state = 0, action) {
  if (action.type == 'SETMEDIATYPE') return action.payload;
  return state;
}
