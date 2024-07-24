export default function useNavigateParent(state, dispatch) {
  let path = state.tabs[state.currentTab]['path'];
  for (let i = 0; i < state.cache.length; i++) {
    if (path == state.cache[i]['path']) {
      dispatch({
        type: 'MODIFYTABPATH',
        payload: {
          tabId: state.currentTab,
          value: 'Home',
        },
      });
      dispatch({
        type: 'MODIFYTABNAME',
        payload: {
          tabId: state.currentTab,
          value: 'Home',
        },
      });
      return 0;
    }
  }

  path = path.split('/');
  path.pop();
  let parentPath = path;
  path = path.join('/');
  dispatch({
    type: 'MODIFYTABPATH',
    payload: {
      tabId: state.currentTab,
      value: path,
    },
  });
  dispatch({
    type: 'MODIFYTABNAME',
    payload: {
      tabId: state.currentTab,
      value: parentPath.pop(),
    },
  });
}
