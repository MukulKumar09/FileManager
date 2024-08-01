export default function searchBar(state = 0, action) {
  if (action.type == 'SEARCHBAR') return !state;
  return state;
}
