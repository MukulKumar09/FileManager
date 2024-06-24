import RNFS from 'react-native-fs';
export default async function useNewItem(type, name) {
    switch (type) {
        case 0: {
            await RNFS.mkdir(path + "/" + name)
        }
        case 1: {
            await RNFS.writeFile(path + "/" + name, "")
        }
    }
}