export default function addNewTab(dispatch, tabCounter) {
  dispatch({
    type: 'ADDTAB',
    payload: {
      counter: tabCounter,
    },
  });
  dispatch({
    type: 'SETCURRENTTAB',
    payload: tabCounter,
  });
  dispatch({
    type: 'INCREASETABCOUNTER',
  });
}
