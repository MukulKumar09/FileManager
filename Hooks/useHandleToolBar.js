import {useEffect} from 'react';
import copyToClipboard from '../Services/copyToClipboard';

import {useDispatch} from 'react-redux';
import startPaste from '../Services/rnfs/startPaste';
import handleDelete from '../Services/fileUtils/handleDelete';
import handleRename from '../Services/fileUtils/handleRename';
import handleNewFile from '../Services/fileUtils/handleNewFile';
import handleNewFolder from '../Services/fileUtils/handleNewFolder';

export default function useHandleToolBar(
  option,
  filesList,
  tab,
  setOption,
  setSearchBar,
  state,
) {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(option);
    switch (option) {
      case 'copy': {
        copyToClipboard(dispatch, filesList, 'copy', tab);
        break;
      }
      case 'move': {
        copyToClipboard(dispatch, filesList, 'move', tab);
        break;
      }
      case 'paste': {
        startPaste(dispatch, state.clipboardItems, tab);
        break;
      }
      case 'delete': {
        handleDelete(dispatch, filesList, tab);
        break;
      }
      case 'rename': {
        handleRename(dispatch, filesList, tab);
        break;
      }
      case 'newFile': {
        handleNewFile(dispatch, tab);
        break;
      }
      case 'newFolder': {
        handleNewFolder(dispatch, tab);
        break;
      }
      case 'search': {
        setSearchBar(true);
      }
    }
    setOption('');
  }, [option]);
}
