import {useEffect} from 'react';
import copyToClipboard from '../Services/copyToClipboard';

import {useDispatch} from 'react-redux';
import startPaste from '../Services/rnfs/startPaste';
import handleRename from '../Services/fileUtils/handleRename';
import handleNewFile from '../Services/fileUtils/handleNewFile';
import handleNewFolder from '../Services/fileUtils/handleNewFolder';
import handleClipboard from '../Services/fileUtils/handleClipboard';
import handleRecycleBin from '../Services/fileUtils/handleRecycleBin';
import addToRecycleBin from '../Services/addToRecycleBin';
import handleOpenWith from '../Services/fileUtils/handleOpenWith';
import modalPromise from '../Actions/modalPromise';
import OpenAs from '../Layout/Modal/ModalBodies/OpenAs';
import MaterialIcon from '../Common/MaterialIcon/MaterialIcon';
import handleOpenAs from '../Services/fileUtils/handleOpenAs';

export default function useHandleOptions(
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
        addToRecycleBin(dispatch, filesList);
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
        setSearchBar(prev => !prev);
        break;
      }
      case 'clipboard': {
        handleClipboard(dispatch);
        break;
      }
      case 'recycleBin': {
        handleRecycleBin(dispatch);
        break;
      }
      case 'openWith': {
        handleOpenWith(dispatch, filesList);
        break;
      }
      case 'openAs': {
        handleOpenAs(dispatch, filesList);
        break;
      }
    }
    setOption('');
  }, [option]);
}
