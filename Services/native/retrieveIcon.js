import RNFS from 'react-native-fs';
import {createThumbnail} from 'react-native-create-thumbnail';
import {Image} from 'react-native';
export default async function retrieveIcon(item, mediaType) {
  // console.log('sent val:', item.id);
  // const data = await new Promise(res => {
  //   TabberModule.getThumbnailPath(
  //     item.path,
  //     allFiles => {
  //       console.log('fetched val:', allFiles);
  //       res(allFiles);
  //     },
  //     error => {
  //       console.error('Error fetching media files:', error);
  //       res([]);
  //     },
  //   );
  // });

  const thumbDir = `file://${RNFS.ExternalDirectoryPath}/thumbnails`;
  const file = item.ext == 'png' ? `${item.path}.png` : `${item.path}.jpg`;
  const hasThumb = await createThumbnail({
    ...item,
    mediaType,
  });
  console.log(hasThumb);
  return (
    <Image
      source={{
        uri: thumbDir + '/' + file,
      }}
      style={{width: 60, height: 60, resizeMode: 'contain'}}
    />
  );
  // }
}
