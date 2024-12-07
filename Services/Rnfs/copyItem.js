import RNFS from 'react-native-fs';
export default async function copyItem(sourcePath, destPath, name) {
  await RNFS.mkdir(destPath);
  return await RNFS.copyFile(sourcePath, destPath + '/' + name);
}
