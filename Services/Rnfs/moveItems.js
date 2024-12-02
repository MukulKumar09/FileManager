import modalPromise from '../../Actions/modalPromise';
import itemExists from '../../Layout/Modal/ModalBodies/itemExists';
import checkExists from './checkExists';
import collectItems from './collectItems';
import moveItem from './moveItem';

export default async function moveItems(dispatch, items, destTab) {
  const destDirPath = destTab.item.path;

  const collectedItems = await collectItems(items, destDirPath);
  for (let item of collectedItems) {
    const {destFilePath, name, path} = item;
    try {
      const isItemExists = await checkExists(destFilePath + name);
      if (isItemExists) {
        const whatToDo = await modalPromise(dispatch, itemExists, item);
        switch (whatToDo) {
          case '/skip': {
            console.log('skipped item');
            break;
          }
          case '/overwrite': {
            console.log('overwrite write');
            await moveItem(path, destFilePath + name);
            break;
          }
          default: {
            console.log('renamed item');
            await moveItem(path, destFilePath + whatToDo);
            break;
          }
        }
      } else {
        await moveItem(path, destFilePath + name);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return 0;
}
