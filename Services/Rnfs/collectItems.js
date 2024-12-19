import getFileExtension from '../fileUtils/getFileExtension';
import getAllFilesFromId from '../native/getAllFilesFromId';

export default async function collectItems(clipboardItems, destTab) {
  const {source, items} = clipboardItems;

  let collectedItems = {'/<>numberOfItems': 0};

  async function recurseCB(items, destination) {
    let listItems = [];
    for (let item of items) {
      if (item.ext == '/') {
        const dirItems = await getAllFilesFromId(item);
        const destPath = destination + '/' + item.name;
        const subChilds = await recurseCB(dirItems, destPath);
        collectedItems[item.path] = subChilds;
      } else {
        const newItem = {
          ...item,
          destPath: destination,
          ext: getFileExtension(item.name),
        };
        if (source == item.parent) {
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
