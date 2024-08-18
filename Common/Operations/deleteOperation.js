export default function deleteOperation(state, dispatch, selectedItems) {
  if (selectedItems.length == 0) {
    dispatch({
      type: 'TOAST',
      payload: 'No items selected',
    });
    //   functionId(-1);
  } else {
    let items = [];
    selectedItems.map(item => {
      let tempItem = {
        name: item['name'],
        path: item['path'],
        fileType: item['fileType'],
        size: item['size'],
      };
      if (
        state.recycleBin.find(item => item['path'] == tempItem['path']) ==
        undefined
      ) {
        items.push(tempItem);
      }
    });
    dispatch({
      type: 'ADDTORECYCLEBIN',
      payload: items,
    });
    dispatch({
      type: 'TOAST',
      payload: selectedItems.length + ' item(s) added to Recycle Bin',
    });
    //   functionId(-1);
  }
}
