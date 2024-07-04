import RNFS from 'react-native-fs';

export default async function useCache(dispatch, path) {
    console.log('built cache')

    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    function niceBytes(x) {
        let l = 0, n = parseInt(x, 10) || 0;
        while (n >= 1024 && ++l) {
            n = n / 1024;
        }
        return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
    }


    let dirData = await RNFS.readDir(path)

    dirData.map(item => {
        item["isDirectory"] = item.isDirectory()
        item["isFile"] = item.isFile()
        item["size"] = niceBytes(item["size"])
    })


    dispatch({
        type: "UPDATECACHE",
        payload: {
            key: path,
            value: dirData
        }
    })
}