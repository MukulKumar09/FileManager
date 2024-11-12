import realmOpen from './realm/realmOpen';
import sortFiles from './sortFiles';
import getSetCache from './getSetCache';

export default async function getFilesList(item, sort) {
  if (!item) return [];

  const realm = await realmOpen();
  const {path} = item;
  const leng = realm.objects('cache');
  console.log(leng.length);

  const data = await getSetCache(realm, path, sort);
  return sortFiles(data, sort);
}
