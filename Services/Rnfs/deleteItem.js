import RNFS from 'react-native-fs';
export default async function deleteItem(path) {
  return await RNFS.unlink(path);
}
