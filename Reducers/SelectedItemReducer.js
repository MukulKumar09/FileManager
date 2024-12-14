export default function selectedItem(state = [], action) {
  if (action.type == 'SETSELECTEDITEM') {
    return action.payload;
  }
  return state;
}
