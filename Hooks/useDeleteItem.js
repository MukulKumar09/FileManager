import RNFS from 'react-native-fs';
export default async function useDeleteItem(item) {
    await RNFS.unlink(item)
}