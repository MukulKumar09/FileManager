import RNFS from 'react-native-fs';
export default async function copyItem(sourcePath, destinationPath, name) {
  await RNFS.mkdir(destinationPath);
  return await RNFS.copyFile(sourcePath, destinationPath + name);
}
