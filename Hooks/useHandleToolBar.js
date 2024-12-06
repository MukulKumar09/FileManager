import {useEffect} from 'react';
import copyToClipboard from '../Services/copyToClipboard';

import {useDispatch} from 'react-redux';
import startPaste from '../Services/rnfs/startPaste';
import askToRename from '../Services/askToRename';
import moveItem from '../Services/rnfs/moveItem';
import collectItems from '../Services/rnfs/collectItems';
import collectHighilightedItems from '../Services/collectHighilightedItems';

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
        const hI = collectHighilightedItems(filesList);
        const db = async () => {
          const cI = await collectItems(hI, '/storage/emulated/0/Music');
          console.log(cI);
        };
        db();
        // copyToClipboard(dispatch, filesList, 'move', item);
        break;
      }
      case 'paste': {
        startPaste(dispatch, item, state.clipboardItems, setPath);
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
