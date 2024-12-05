import modalPromise from '../../Actions/modalPromise';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import ItemExists from '../../Layout/Modal/ModalBodies/ItemExists';
import handleFile from '../handleFile';
import checkExists from './checkExists';
import copyItem from './copyItem';
import RNFS from 'react-native-fs';

export default async function copyItems(
  dispatch,
  items,
  destTab,
  setItem,
  setItemProgress,
  setTotalProgress,
) {
  dispatch({type: 'TOAST', payload: `Copy started`});
  const destDirPath = destTab.path;
  let isSuccess = 0;

  async function recursiveCopy(listItems, destination) {
    for (let item of listItems) {
      setItem(item);
      const {name, path, ext, isDirectory} = item;
      const destPath = destination + '/' + name;

      if (ext == '/' || (isDirectory && isDirectory() == 1)) {
        await RNFS.mkdir(destPath);
        let dirItems = await RNFS.readDir(path);
        await recursiveCopy(dirItems, destPath);
      } else {
        isSuccess = await handleFile(dispatch, copyItem, destPath, item, path);
      }
    }
    return 0;
  }
  await recursiveCopy(items, destDirPath);
  if (isSuccess == 1) {
    dispatch({
      type: 'TOAST',
      payload: 'Copy Successful.',
    });
  } else {
    dispatch({
      type: 'TOAST',
      payload: 'Some items failed to copy.  ',
    });
  }
  return 1;
}
