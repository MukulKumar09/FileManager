import {useEffect} from 'react';
import copyToClipboard from '../Services/copyToClipboard';

import {useDispatch} from 'react-redux';
import startPaste from '../Services/rnfs/startPaste';
import askToRename from '../Services/askToRename';
import moveItem from '../Services/rnfs/moveItem';

export default function useHandleToolBar(
  option,
  filesList,
  item,
  setOption,
  setPath,
  state,
) {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(option);
    switch (option) {
      case 'copy': {
        copyToClipboard(dispatch, filesList, 'copy', item);
        break;
      }
      case 'move': {
        copyToClipboard(dispatch, filesList, 'move', item);
        break;
      }
      case 'paste': {
        startPaste(dispatch, state.clipboardItems, {...item}, setPath);
        break;
      }
      case 'rename': {
        async function asyncFnc() {
          let lastHighlightedItem = {
            ...filesList.findLast(item => item.isHighlighted),
          };
          const {path, parent} = lastHighlightedItem;
          lastHighlightedItem.destFilePath = parent;
          const newName = await askToRename(dispatch, lastHighlightedItem);
          if (newName) {
            await moveItem(path, parent, newName);
            dispatch({type: 'TOAST', payload: 'Renamed successfully.'});
          }
          setPath(item.path);
          dispatch({type: 'POPMODALSTACK'});
        }
        asyncFnc();
      }
    }
    setOption('');
  }, [option]);
}
