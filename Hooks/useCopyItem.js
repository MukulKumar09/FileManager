import RNFS from 'react-native-fs';
export default async function useCopyItem(item, dest) {
    await RNFS.copyFile(item, dest)
}