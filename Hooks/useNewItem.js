import RNFS from 'react-native-fs';
export default async function useNewItem(path, type, name) {
    switch (type) {
        case 0: {
            await RNFS.mkdir(path + "/" + name)
            break
        }
        case 1: {
            await RNFS.writeFile(path + "/" + name, "")
            break
        }
    }
}