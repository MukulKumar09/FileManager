import RNFS from 'react-native-fs';
import checkExists from '../rnfs/checkExists';
import {createThumbnail} from 'react-native-create-thumbnail';
import {Image} from 'react-native';
export default async function retrieveIcon(item, mediaType) {
  const thumbDir = `file://${RNFS.ExternalDirectoryPath}/thumbnails`;
  const file = item.ext == 'png' ? `${item.path}.png` : `${item.path}.jpg`;
  const isThumbExists = await checkExists(thumbDir, file);
  let thumbStatus = {status: 'success'};
  if (!isThumbExists) {
    thumbStatus = await createThumbnail({
      ...item,
      url: item.path,
      mediaType,
    });
    console.log(mediaType, ' thumb created');
  }
  if (thumbStatus.status == 'success') {
    return (
      <Image
        source={{
          uri: thumbDir + '/' + file,
        }}
        style={{width: 50, height: 50, resizeMode: 'contain'}}
      />
    );
  }
}
