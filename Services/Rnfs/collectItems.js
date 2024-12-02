import RNFS from 'react-native-fs';
import getFileExtension from '../getFileExtension';

export default async function collectItems(items, destDirPath) {
  let collectedItems = [];
  for (let item of items) {
    if (
      item.type == 'dir' ||
      (item.isDirectory && item.isDirectory() == true)
    ) {
      let dirItems = await RNFS.readDir(item.path);
      const recurse = await collectItems(
        dirItems,
        destDirPath + '/' + item.name,
      );
      collectedItems.push(...recurse);
    } else {
      const newItem = {
        ...item,
        destFilePath: destDirPath + '/',
        ext: getFileExtension(item.name),
      };
      // console.log(newItem.name);
      collectedItems.push(newItem);
    }
  }
  return collectedItems;
}
