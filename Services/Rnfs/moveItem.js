import RNFS from 'react-native-fs';
export default async function moveItem(sourcePath, destinationPath) {
  try {
    await RNFS.moveFile(sourcePath, destinationPath);
  } catch (error) {
    console.log(error);
  }
}
