import handleFile from '../handleFile';
import moveItem from './moveItem';
import RNFS from 'react-native-fs';

export default async function moveItems(
  dispatch,
  items,
  destTab,
  setItem,
  setItemProgress,
  setTotalProgress,
) {
  dispatch({type: 'TOAST', payload: `Move started`});
  const destDirPath = destTab.path;
  let isSuccess = 0;

  async function recursiveMove(listItems, destination) {
    let isAnythingRemaining = 0; //If the move fails or is skipped, set the flag to 1 and prevent the directory from being deleted.
    for (let item of listItems) {
      setItem(item);
      const {name, path, ext, isDirectory} = item;
      const destPath = destination + '/' + name;

      if (ext == '/' || (isDirectory && isDirectory() == 1)) {
        await RNFS.mkdir(destPath);
        let dirItems = await RNFS.readDir(path);
        const isAnythingRemaining = await recursiveMove(dirItems, destPath);
        if (isAnythingRemaining == 0) {
          await RNFS.unlink(path);
        }
      } else {
        isSuccess = await handleFile(
          dispatch,
          moveItem,
          item,
          path,
          destination,
        );
      }
    }
    return isAnythingRemaining;
  }
  await recursiveMove(items, destDirPath);
  if (isSuccess == 1) {
    dispatch({
      type: 'TOAST',
      payload: 'Move Successful.',
    });
  } else {
    dispatch({
      type: 'TOAST',
      payload: 'Some items failed to move.  ',
    });
  }
  return 1;
}
