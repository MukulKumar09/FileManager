import RNFS from 'react-native-fs';
import getFileExtension from '../fileUtils/getFileExtension';

export default async function collectItems(clipboardItems, destTab) {
  const {source, items} = clipboardItems;
  let collectedItems = {'/<>numberOfItems': 0};

  async function recurseCB(items, destination) {
    let listItems = [];
    for (let item of items) {
      if (
        item.type == 'dir' ||
        (item.isDirectory && item.isDirectory() == true)
      ) {
        let dirItems = await RNFS.readDir(item.path);
        const destPath = destination + '/' + item.name;
        const subChilds = await recurseCB(dirItems, destPath);
        collectedItems[item.path] = subChilds;
      } else {
        const newItem = {
          ...item,
          destPath: destination,
          ext: getFileExtension(item.name),
        };
        if (`${source.path}/` == item.parent) {
          collectedItems[item.path] = newItem;
        } else {
          listItems.push(newItem);
        }
        collectedItems['/<>numberOfItems'] =
          collectedItems['/<>numberOfItems'] + 1;
      }
    }
    return listItems;
  }
  await recurseCB(items, destTab.path);
  return collectedItems;
}
