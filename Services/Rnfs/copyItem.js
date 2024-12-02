import RNFS from 'react-native-fs';
export default async function copyItem(sourcePath, destinationPath) {
  try {
    await RNFS.copyFile(sourcePath, destinationPath);
  } catch (error) {
    console.log(error);
  }
}
