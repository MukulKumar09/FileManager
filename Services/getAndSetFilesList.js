import getFilesList from './getFilesList';

export default async function getAndSetFilesList(
  setFilesList,
  setIsLoading,
  item,
  sort,
) {
  setIsLoading(1);
  const filesCache = await getFilesList(item, sort);
  setFilesList(filesCache);
  setIsLoading(0);
  return filesCache;
}
