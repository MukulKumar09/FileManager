import RNFS from 'react-native-fs';
export default async function CacheHandler(path) {
    let dirListing
    try {
        dirListing = await RNFS.readDir(path)
    } catch (error) {
        dirListing = []
    }
    return dirListing
}