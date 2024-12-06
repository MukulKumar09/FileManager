import handleFile from './handleFile';
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
  const {path: destDirPath} = destTab;
  let isSuccess = 0;

  async function recursiveCopy(listItems, destination) {
    for (let item of listItems) {
      setItem(item);
      setItemProgress(0);

      const {name, path, ext, isDirectory} = item;
      const destPath = destination + '/' + name;

      try {
        if (ext == '/' || (isDirectory && isDirectory() == 1)) {
          await RNFS.mkdir(destPath);
          let dirItems = await RNFS.readDir(path);
          await recursiveCopy(dirItems, destPath);
        } else {
          item.destFilePath = destination;
          isSuccess = await handleFile(
            dispatch,
            copyItem,
            item,
            path,
            destination,
          );
        }
      } catch (error) {
        console.log(error);
      }

      setItemProgress(100);
    }
    return 0;
  }

  setTotalProgress(0);
  await recursiveCopy(items, destDirPath);
  setTotalProgress(100);

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
