import RNFS from 'react-native-fs';
export default async function checkExists(destPath, name) {
  const checkExists = await RNFS.exists(destPath + '/' + name);
  return checkExists;
}
