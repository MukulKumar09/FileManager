import RNFS from 'react-native-fs';
export default async function moveItem(source, destinationPath, name) {
  return await RNFS.moveFile(source, destinationPath + '/' + name);
}
