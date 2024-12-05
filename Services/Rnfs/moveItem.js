import RNFS from 'react-native-fs';
export default async function moveItem(source, destination) {
  return await RNFS.moveFile(source, destination);
}
