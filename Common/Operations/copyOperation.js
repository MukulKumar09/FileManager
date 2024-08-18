export default function copyOperation(state, dispatch, selectedItems, type) {
  if (selectedItems.length == 0) {
    dispatch({
      type: 'TOAST',
      payload: 'No items selected',
    });
    // functionId(-1);
  } else {
    dispatch({
      type: 'COPYTOCB',
      payload: selectedItems,
    });
    dispatch({
      type: 'OPERATIONTYPE',
      payload: type,
    });
    dispatch({
      type: 'OPERATIONSOURCE',
      payload: state.tabs[state.currentTab]['path'],
    });
    dispatch({
      type: 'TOAST',
      payload:
        selectedItems.length + ' item(s) ' + (type ? 'moving' : 'copied'),
    });
    // functionId(-1);
  }
}
