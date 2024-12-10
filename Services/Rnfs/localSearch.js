import RNFS from 'react-native-fs';
import getFileExtension from '../fileUtils/getFileExtension';
export default async function localSearch(tab, searchString) {
  async function recurseCB(list) {
    let listItems = [];
    for (let item of list) {
      if (
        item.type == 'dir' ||
        (item.isDirectory && item.isDirectory() == true)
      ) {
        if (item.name.includes(searchString)) {
          item.ext = '/';
          item.isSearched = true;
          listItems.push(item);
        }
        const dirItems = await RNFS.readDir(item.path);
        const subChilds = await recurseCB(dirItems);
        listItems.push(...subChilds);
      } else {
        if (item.name.includes(searchString)) {
          item.ext = getFileExtension(item.name);
          item.isSearched = true;
        }
      }
    }
    return listItems;
  }
  const searchedItems = await recurseCB(await RNFS.readDir(tab.path));
  return searchedItems;
}