import RNFS from 'react-native-fs';
import normalizeTimestamp from '../fileUtils/normalizeTimestamp';

export default async function validateCache(realm, item) {
  const {path} = item;

  //get parent mtime from RNFS
  const stat = await RNFS.stat(path);
  const {mtime: mtimeStat} = stat;
  const normalizedMimeStat = normalizeTimestamp(mtimeStat);

  //get parent mtime from cache
  const realmData = realm.objects('cache').find(cache => cache.path == path);
  const {mtime: mtimeRealm} = realmData;
  const result = mtimeRealm == normalizedMimeStat;
  if (!result) {
    realm.write(() => {
      realm.create(
        'cache',
        {
          ...realmData,
          mtime: normalizedMimeStat,
        },
        'modified',
      );
    });
  }
  return result;
}
