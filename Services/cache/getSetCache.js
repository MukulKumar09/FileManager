import getFileExtension from '../fileUtils/getFileExtension';
import realmOpen from '../realm/realmOpen';
import {NativeModules} from 'react-native';
export default async function getSetCache(clickedItem) {
  const {TabberModule} = NativeModules;
  const realm = await realmOpen();
  const {id, path: clickedItemPath} = clickedItem;
  if (clickedItemPath == 'Home') {
    const homeData = realm.objects('cache').filtered('type == "Home"');
    return homeData;
  }
  const data = await new Promise(res => {
    TabberModule.getAllFiles(
      parseInt(id),
      mediaFiles => {
        mediaFiles = mediaFiles.map(item => ({
          ...item,
          name: item.name || item.title || '<UnknownFile>',
          ext: getFileExtension(item.name || item.title || '<UnknownFile>'),
          parent: clickedItemPath,
        }));
        // console.log(mediaFiles);
        res(mediaFiles);
      },
      error => {
        console.error('Error fetching media files:', error);
        res([]);
      },
    );
  });
  return data;
}
