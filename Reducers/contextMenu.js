export default function contextMenu(state = 0, action) {
  if (action.type == 'CONTEXTMENU') return !state;
  return state;
}
