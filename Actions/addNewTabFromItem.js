export default function addNewTabFromItem(dispatch, counter, item) {
  dispatch({
    type: 'ADDTABFROMITEM',
    payload: {
      counter,
      item,
    },
  });
  dispatch({
    type: 'SETCURRENTTAB',
    payload: counter,
  });
  dispatch({
    type: 'INCREASETABCOUNTER',
  });
}
