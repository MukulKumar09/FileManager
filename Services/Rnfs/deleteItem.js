import RNFS from 'react-native-fs';
export default async function deleteItem(item) {
  return await RNFS.unlink(item.path);
}
