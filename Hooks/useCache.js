import RNFS from 'react-native-fs';
export default async function useCache(dispatch, path) {
    let dirData = await RNFS.readDir(path)

    dispatch({
        type: "UPDATECACHE",
        payload: {
            key: path,
            value: dirData
        }
    })
}