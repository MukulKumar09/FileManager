import RNFS from 'react-native-fs';
export default async function checkExists(parent, name) {
  const checkExists = await RNFS.exists(parent + '/' + name);
  return checkExists;
}
