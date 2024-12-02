import RNFS from 'react-native-fs';
export default async function checkExists(path) {
  const checkExists = await RNFS.exists(path);
  return checkExists;
}
