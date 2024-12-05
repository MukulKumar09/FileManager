import realmOpen from './realm/realmOpen';
import sortFiles from './sortFiles';
import getSetCache from './getSetCache';

export default async function getFilesList(item, sort) {
  if (!item) return [];

  const realm = await realmOpen();

  const data = await getSetCache(realm, item, sort);
  return sortFiles(data, sort);
}
