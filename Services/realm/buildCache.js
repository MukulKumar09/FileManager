import getFileExtension from '../fileUtils/getFileExtension';

import RNFS from 'react-native-fs';
import normalizeTimestamp from '../fileUtils/normalizeTimestamp';

export default async function buildCache(realm, clickedItemPath) {
  console.log('built cache', clickedItemPath);

  const folderContents = await RNFS.readDir(clickedItemPath);
  for (let i in folderContents) {
    const {name, path, size, mtime, isDirectory} = folderContents[i];
    const normalizedMtime = normalizeTimestamp(mtime);

    if (isDirectory()) {
      var type = 'dir';
      var ext = '/';
    } else {
      var type = 'file';
      var ext = getFileExtension(name);
    }
    const realmDoc = {
      name,
      parent: `${clickedItemPath}/`,
      path,
      size,
      type,
      ext,
      mtime: normalizedMtime,
    };
    realm.write(() => {
      realm.create('cache', realmDoc, 'modified');
    });
    folderContents[i] = {...folderContents[i], ...realmDoc};
  }

  return folderContents;
}
