import RNFS from 'react-native-fs';
export default async function DeleteHandler(item) {
    await RNFS.unlink(item)
}