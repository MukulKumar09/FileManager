import sortFiles from '../fileUtils/sortFiles';
import getSetCache from './getSetCache';

export default async function getFilesList(item, sort) {
  if (!item) return [];
  const data = await getSetCache(item, sort);
  return sortFiles(data, sort);
}
