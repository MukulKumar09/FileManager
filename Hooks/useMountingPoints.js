import RNFS from 'react-native-fs';
export default function useMountingPoints(dispatch) {
    console.log("i ran")
    let mntPnts = []
    async function MntPnts() {
        let allMounts = await RNFS.getAllExternalFilesDirs()
        allMounts.map((i) => {
            let count = 1
            let temp = i.split("/")
            let indx = temp.indexOf("Android")
            temp.length = indx
            let pathFull = temp.join("/")
            mntPnts.push({
                path: pathFull,
                isDirectory: () => 1,
                isFile: () => 0,
                name: pathFull == RNFS.ExternalStorageDirectoryPath ? "Internal Storage" : "External Storage " + count,
            })
            count++
        })
        dispatch({
            type: "UPDATECACHE",
            payload: {
                key: "Home",
                value: mntPnts
            }
        })
    }
    MntPnts()
    dispatch({
        type: "RESETTABS"
    })
    dispatch({
        type: "INCREASETABCOUNTER",
    })
    return 1
}