import modalPromise from '../../Actions/modalPromise';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import ItemExists from '../../Layout/Modal/ModalBodies/ItemExists';
import checkExists from './checkExists';
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
      const {name, path, ext, isDirectory} = item;
      const destPath = destination + '/' + name;

      if (ext == '/' || (isDirectory && isDirectory() == 1)) {
        await RNFS.mkdir(destPath);
        let dirItems = await RNFS.readDir(path);
        const isAnythingRemaining = await recursiveMove(dirItems, destPath);
        console.log(isAnythingRemaining);
        if (isAnythingRemaining == 0) {
          await RNFS.unlink(path);
        }
      } else {
        try {
          const isItemExists = await checkExists(destPath);
          if (isItemExists) {
            const whatToDo = await modalPromise(
              dispatch,
              ItemExists,
              {item},
              {
                icon: <MaterialIcon name="alert-outline" />,
                heading: `Item Already Exists!`,
                subHeading: `In Destination: ${destPath}`,
              },
            );
            switch (whatToDo) {
              case null:
              case '/skip': {
                isAnythingRemaining = 1; //if any item is skipped
                console.log('skipped item');
                break;
              }
              case '/overwrite': {
                console.log('overwrite write');
                await moveItem(path, destPath);
                break;
              }
              default: {
                console.log('renamed item');
                await moveItem(path, destination + '/' + whatToDo);
                break;
              }
            }
          } else {
            await moveItem(path, destPath);
          }
          isSuccess = 1;
        } catch (error) {
          console.log(error);
          isAnythingRemaining = 1; //if error in moving item
          isSuccess = 0;
        }
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
