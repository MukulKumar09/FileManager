import RNFS from 'react-native-fs';
import useNiceBytes from './useNiceBytes';

export default async function useCache(dispatch, path) {
    console.log('built cache')

    let dirData = await RNFS.readDir(path)

    dirData.map(item => {
        item["isDirectory"] = item.isDirectory()
        item["isFile"] = item.isFile()
        item["size"] = useNiceBytes(item["size"])
    })


    dispatch({
        type: "UPDATECACHE",
        payload: {
            key: path,
            value: dirData
        }
    })
}