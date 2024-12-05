export default function currentTab(state = 0, action) {
  if (action.type == 'SETCURRENTTAB') return action.payload;
  return state;
}
