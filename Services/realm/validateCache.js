import RNFS from 'react-native-fs';
import normalizeTimestamp from '../normalizeTimestamp';
export default async function validateCache(realm, path) {
  //get parent mtime from RNFS
  const stat = await RNFS.stat(path);

  const mtimeStat = stat.mtime;
  const normalizedMimeStat = normalizeTimestamp(mtimeStat);

  //get parent mtime from cache
  const realmData = realm.objects('cache').find(cache => cache.path == path);
  const mtimeRealm = realmData.mtime;

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
