import RNFS from 'react-native-fs';
export default async function checkExists(destinationPath, name) {
  const checkExists = await RNFS.exists(destinationPath + '/' + name);
  return checkExists;
}
