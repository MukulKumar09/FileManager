import useCache from '../../Hooks/useCache';
import useCopyMoveItem from '../../Hooks/useCopyMoveItem';

export default function renameOperation(state, dispatch, selectedItem) {
  if (selectedItem.length == 0) {
    dispatch({
      type: 'TOAST',
      payload: 'No items selected',
    });
  } else {
    dispatch({
      type: 'ITEMINOPERATION',
      payload: selectedItem['name'],
    });
    const renameAsync = async () => {
      let completedSize = 0;
      let totalSize = 0;
      selectedItem['itemDest'] = state.tabs[state.currentTab]['path'];
      dispatch({
        type: 'INPUTMODAL',
        payload: 'Item',
      });
      selectedItem['name'] = await new Promise(resolve => {
        dispatch({
          type: 'INPUTPROMISERESOLVER',
          payload: resolve,
        });
      });
      await useCopyMoveItem(
        dispatch,
        1,
        completedSize,
        totalSize,
        selectedItem,
      );
      dispatch({
        type: 'INPUTMODAL',
        payload: 0,
      });
      useCache(dispatch, state.tabs[state.currentTab]['path']);
      dispatch({
        type: 'ITEMINOPERATION',
        payload: '',
      });
      dispatch({
        type: 'TOAST',
        payload: 'Item renamed.',
      });
    };
    renameAsync();
  }
  //   functionId(-1);
}
