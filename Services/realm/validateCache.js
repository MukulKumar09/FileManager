import RNFS from 'react-native-fs';
import normalizeTimestamp from '../normalizeTimestamp';
export default async function validateCache(realm, item) {
  const {path, mtime} = item;
  console.log(item);
  if (mtime == 'latest') return 0; //force buildCache
  //get parent mtime from RNFS
  const stat = await RNFS.stat(path);
  const {mtime: mtimeStat} = stat;
  const normalizedMimeStat = normalizeTimestamp(mtimeStat);

  //get parent mtime from cache
  const realmData = realm.objects('cache').find(cache => cache.path == path);
  // console.log(mtime, normalizedMimeStat);
  if (mtime == 'cache') return realmData; //force getCache
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
