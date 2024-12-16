import getFileExtension from '../fileUtils/getFileExtension';
import getFilesList from './getFilesList';
import {NativeModules} from 'react-native';

export default async function getAndSetFilesList(
  setFilesList,
  setIsLoading,
  item,
  sort,
) {
  console.log('item', item);
  const {CustomModule} = NativeModules;
  setFilesList([]);
  async function getMedia() {
    return await new Promise(res => {
      CustomModule.getImages(
        mediaFiles => {
          mediaFiles = mediaFiles.map(item => ({
            ...item,
            ext: getFileExtension(item.name),
            isMedia: true,
          }));
          res(mediaFiles);
        },
        error => {
          console.error('Error fetching media files:', error);
          res([]);
        },
      );
    });
  }
  let filesCache;
  setIsLoading(1);
  if (item.isMedia) {
    filesCache = await getMedia();
  } else {
    filesCache = await getFilesList(item, sort);
  }
  setFilesList(filesCache);
  setIsLoading(0);
}
