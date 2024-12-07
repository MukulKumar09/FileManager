import RNFS from 'react-native-fs';
export default async function moveItem(sourcePath, destPath, name) {
  await RNFS.mkdir(destPath);
  return await RNFS.moveFile(sourcePath, destPath + '/' + name);
}
