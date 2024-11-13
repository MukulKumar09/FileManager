import getFilesList from './getFilesList';

export default async function (setFilesList, setIsLoading, item, sort) {
  setIsLoading(1);
  const filesCache = await getFilesList(item, sort);
  setIsLoading(0);
  setFilesList(filesCache);
}
