import getFileExtension from '../fileUtils/getFileExtension';

import RNFS from 'react-native-fs';
import normalizeTimestamp from '../fileUtils/normalizeTimestamp';

export default async function buildCache(realm, fullPath, cacheToInvalidate) {
  console.log('built cache', fullPath);
  if (cacheToInvalidate) {
    realm.write(() => {
      realm.delete(cacheToInvalidate);
    });
  }

  const rnfsData = await RNFS.readDir(fullPath);
  for (item of rnfsData) {
    const {name, path, size, mtime, isDirectory} = item;
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
      parent: `${fullPath}/`,
      path,
      size,
      type,
      ext,
      mtime: normalizedMtime,
    };
    realm.write(() => {
      realm.create('cache', realmDoc);
    });
    item.parent = `${fullPath}/`;
    item.path = path;
    item.type = type;
    item.ext = ext;
    item.mtime = normalizedMtime;
  }

  return rnfsData;
}
