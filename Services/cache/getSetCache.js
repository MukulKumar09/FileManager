import buildCache from '../realm/buildCache';
import realmOpen from '../realm/realmOpen';
import validateCache from '../realm/validateCache';
export default async function getSetCache(clickedItem) {
  const realm = await realmOpen();
  const {path: clickedItemPath, name: clickedItemName, mtime} = clickedItem;
  if (clickedItemPath == 'Home') {
    const homeData = realm.objects('cache').filtered('type == "Home"');
    return homeData;
  }

  function deepCopy(data) {
    //otherwise all object will reference to realm live objects
    const duplicatedData = data.map(item => ({...item}));
    return duplicatedData;
  }

  async function fetchFromStorage() {
    const newData = await buildCache(realm, clickedItemPath);
    return deepCopy(newData);
  }

  const folderInDb = realm.objectForPrimaryKey('cache', clickedItemPath);

  if (folderInDb) {
    const folderContents = realm
      .objects('cache')
      .filtered(`parent == "${clickedItemPath}/"`);
    if (mtime == 'latest') {
      return await fetchFromStorage();
    }

    if (folderContents.length > 0) {
      if (mtime == 'cache') {
        return deepCopy(folderContents);
      }
      const isCacheValid = await validateCache(realm, folderInDb, clickedItem);
      if (isCacheValid) {
        console.log('found cache');
        return deepCopy(folderContents);
      }
    }
  } else {
    //create folder
    console.log('folder created');
    realm.write(() => {
      realm.create('cache', {
        name: clickedItemName,
        path: clickedItemPath,
        size: 0,
        mtime: 0,
        type: 'dir',
        ext: '/',
        parent: '',
      });
    });
  }

  return await fetchFromStorage();
}
