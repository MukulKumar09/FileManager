import RNFS from 'react-native-fs';
export default async function useMoveItem(item, dest) {
    await RNFS.moveFile(item, dest)
}