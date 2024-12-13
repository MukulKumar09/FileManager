import {useEffect} from 'react';
import copyToClipboard from '../Services/copyToClipboard';
import {useDispatch, useSelector} from 'react-redux';
import startPaste from '../Services/rnfs/startPaste';
import handleRename from '../Services/fileUtils/handleRename';
import handleNewFile from '../Services/fileUtils/handleNewFile';
import handleNewFolder from '../Services/fileUtils/handleNewFolder';
import handleClipboard from '../Services/fileUtils/handleClipboard';
import handleRecycleBin from '../Services/fileUtils/handleRecycleBin';
import addToRecycleBin from '../Services/addToRecycleBin';
import handleOpenWith from '../Services/fileUtils/handleOpenWith';
import handleOpenAs from '../Services/fileUtils/handleOpenAs';
import handleOpenInNewTab from '../Services/fileUtils/handleOpenInNewTab';
import handleProperties from '../Services/handleProperties';
import modalPromise from '../Actions/modalPromise';
import Favourites from '../Layout/Modal/ModalBodies/Favourites';
import MaterialIcon from '../Common/MaterialIcon/MaterialIcon';

export default function useHandleOptions(
  option,
  filesList,
  tab,
  setOption,
  setSearchBar,
  refresh,
) {
  const dispatch = useDispatch();
  const state = {
    tabCounter: useSelector(state => state.tabCounter),
    clipboardItems: useSelector(state => state.clipboardItems),
  };
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
      case 'openInNewTab': {
        handleOpenInNewTab(dispatch, state.tabCounter, filesList);
        break;
      }
      case 'refresh': {
        refresh(0);
        break;
      }
      case 'properties': {
        handleProperties(dispatch, filesList);
        break;
      }
      case 'favourites': {
        async function ab() {
          await modalPromise(
            dispatch,
            Favourites,
            {tab},
            {
              icon: <MaterialIcon name="heart" color="#FF5252" />,
              heading: `Favourites`,
            },
          );
        }
        ab();
        break;
      }
      case 'about': {
        break;
      }
    }
    setOption('');
  }, [option]);
}
