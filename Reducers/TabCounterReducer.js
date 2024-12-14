export default function tabCounter(state = 0, action) {
  if (action.type == 'INCREASETABCOUNTER') return state + 1;
  if (action.type == 'SETTABCOUNTER') return action.payload;
  return state;
}
