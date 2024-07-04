import RNFS from 'react-native-fs';

export default async function useCache(dispatch, path) {
    console.log('built cache')

    let dirData = await RNFS.readDir(path)

    dirData.map(item => {
        item["isDirectory"] = item.isDirectory()
        item["isFile"] = item.isFile()
    })

    dispatch({
        type: "UPDATECACHE",
        payload: {
            key: path,
            value: dirData
        }
    })
}