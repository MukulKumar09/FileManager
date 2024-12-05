import {useEffect} from 'react';
import copyToClipboard from '../Services/copyToClipboard';
import startPaste from '../Services/startPaste';
import {useDispatch} from 'react-redux';

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
        startPaste(dispatch, item, state.clipboardItems, setPath);
        break;
      }
    }
    setOption('');
  }, [option]);
}
