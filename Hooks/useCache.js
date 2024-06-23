import RNFS from 'react-native-fs';
export default async function useCache(dispatch, path) {
    dispatch({
        type: "UPDATECACHE",
        payload: {
            key: path,
            value: await RNFS.readDir(path)
        }
    })
}