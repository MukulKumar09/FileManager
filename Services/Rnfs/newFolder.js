import RNFS from 'react-native-fs';
export default async function newFolder(destPath, name) {
  return await RNFS.mkdir(destPath + '/' + name);
}
