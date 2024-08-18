export default function openInNewTabOperation(state, dispatch, selectedItem) {
  if (selectedItem.length == 0 || selectedItem.isFile) {
    dispatch({
      type: 'DUPLICATETAB',
      payload: {
        tabKey: state.tabCounter,
        title: state.tabs[state.currentTab]['name'],
        path: state.tabs[state.currentTab]['path'],
        type: 'filebrowser',
      },
    });
    dispatch({
      type: 'SETCURRENTTAB',
      payload: state.tabCounter,
    });
    dispatch({
      type: 'INCREASETABCOUNTER',
    });
  } else {
    dispatch({
      type: 'DUPLICATETAB',
      payload: {
        tabKey: state.tabCounter,
        title: selectedItem['name'],
        path: selectedItem['path'],
        type: 'filebrowser',
      },
    });
    dispatch({
      type: 'SETCURRENTTAB',
      payload: state.tabCounter,
    });
    dispatch({
      type: 'INCREASETABCOUNTER',
    });
  }
}
