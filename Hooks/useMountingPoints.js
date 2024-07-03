import RNFS from 'react-native-fs';

export default async function useMountingPoints(dispatch) {

    async function MntPnts() {
        let mntPnts = []
        let allMounts = await RNFS.getAllExternalFilesDirs()
        allMounts.map((i) => {
            let count = 1
            let temp = i.split("/")
            let indx = temp.indexOf("Android")
            temp.length = indx
            let pathFull = temp.join("/")
            mntPnts.push({
                path: pathFull,
                isDirectory: true,
                isFile: false,
                name: pathFull == RNFS.ExternalStorageDirectoryPath ? "Internal Storage" : "External Storage " + count,
            })
            count++
        })
        return mntPnts
    }

    // if (await RNFS.exists(RNFS.ExternalCachesDirectoryPath + "/favorites.json")) {
    //     let favorites = await RNFS.readFile(RNFS.ExternalCachesDirectoryPath + "/favorites.json");
    //     dispatch({
    //         type: "SETFAVOURITEITEM",
    //         payload: favorites
    //     })
    // } else {
    //     let d = {
    //         name: 'mukul',
    //         a: () => 1
    //     }
    //     await RNFS.writeFile(RNFS.ExternalCachesDirectoryPath + "/favorites.json", JSON.stringify(d))
    // }

    dispatch({
        type: "SETCACHE",
        payload: {
            Home: await MntPnts()
        }
    })
    dispatch({
        type: "RESETTABS"
    })
    dispatch({
        type: "SETCURRENTTAB",
        payload: "0"
    })
    dispatch({
        type: "INCREASETABCOUNTER",
    })
}