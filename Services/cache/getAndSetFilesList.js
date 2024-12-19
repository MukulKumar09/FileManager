import getFilesList from './getFilesList';

export default async function getAndSetFilesList(
  setFilesList,
  setIsLoading,
  item,
  sort,
) {
  console.log('item', item);
  setFilesList([]); //clearing to prevent virtualizedlist to fire all items before updating
  setIsLoading(1);
  setFilesList(await getFilesList(item, sort));
  setIsLoading(0);
}
