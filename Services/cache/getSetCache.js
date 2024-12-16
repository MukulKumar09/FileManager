import buildCache from '../realm/buildCache';
import realmOpen from '../realm/realmOpen';
import validateCache from '../realm/validateCache';
import {NativeModules} from 'react-native';
export default async function getSetCache(clickedItem) {
  const {CustomModule} = NativeModules;
  const realm = await realmOpen();
  const {path: clickedItemPath, id, name: clickedItemName, mtime} = clickedItem;
  if (clickedItemPath == 'Home') {
    const homeData = realm.objects('cache').filtered('type == "Home"');
    return homeData;
  }
  const data = await new Promise(res => {
    CustomModule.getAllFiles(
      0,
      mediaFiles => {
        mediaFiles = mediaFiles.map(item => ({
          ...item,
          ext: '/',
          size: 10000,
        }));
        res(mediaFiles);
      },
      error => {
        console.error('Error fetching media files:', error);
        res([]);
      },
    );
  });
  return data;

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
