import useCache from '../../Hooks/useCache';
import useNewItem from '../../Hooks/useNewItem';

export default function newItemOperation(state, dispatch, type) {
  dispatch({
    type: 'ITEMINOPERATION',
    payload: '',
  });
  const newFolderAsync = async () => {
    let updatedName;
    dispatch({
      type: 'INPUTMODAL',
      payload: type ? 'File' : 'Folder',
    });
    updatedName = await new Promise(resolve => {
      dispatch({
        type: 'INPUTPROMISERESOLVER',
        payload: resolve,
      });
    });
    await useNewItem(state.tabs[state.currentTab]['path'], type, updatedName);
    dispatch({
      type: 'INPUTMODAL',
      payload: 0,
    });
    useCache(dispatch, state.tabs[state.currentTab]['path']);
  };
  newFolderAsync();
}
