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
  const {TabberModule} = NativeModules;
  setFilesList([]);
  async function getMediaFilesList() {
    return await new Promise(res => {
      TabberModule.getMedia(
        item.isMedia,
        images => {
          images = images.map(image => ({
            ...image,
            ext: getFileExtension(image.name),
            isMedia: true,
          }));
          res(images);
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
  filesCache = item.isMedia
    ? await getMediaFilesList(item.isMedia)
    : await getFilesList(item, sort);
  setFilesList(filesCache);
  setIsLoading(0);
}
