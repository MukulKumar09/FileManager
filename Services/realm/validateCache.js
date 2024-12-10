import RNFS from 'react-native-fs';
import normalizeTimestamp from '../fileUtils/normalizeTimestamp';

export default async function validateCache(realm, folderInDb, item) {
  const {path} = item;

  //get parent mtime from RNFS
  const stat = await RNFS.stat(path);
  const {mtime: mtimeStat} = stat;
  const normalizedMimeStat = normalizeTimestamp(mtimeStat);

  //get parent mtime from cache
  const {mtime: mtimeRealm} = folderInDb;
  const result = mtimeRealm == normalizedMimeStat;
  if (!result) {
    realm.write(() => {
      realm.create(
        'cache',
        {
          ...folderInDb,
          mtime: normalizedMimeStat,
        },
        'modified',
      );
    });
  }
  return result;
}
