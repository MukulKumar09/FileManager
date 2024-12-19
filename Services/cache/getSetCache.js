import getAllFilesFromId from '../native/getAllFilesFromId';
import realmOpen from '../realm/realmOpen';
export default async function getSetCache(item) {
  const realm = await realmOpen();
  const {path: clickedItemPath, mediaType} = item;
  if (clickedItemPath == 'Home') {
    const homeData = realm.objects('cache').filtered('type == "Home"');
    return homeData;
  }
  const data = await getAllFilesFromId(item, mediaType);
  return data;
}
