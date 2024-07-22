import RNFS from 'react-native-fs';
import { openDatabase } from 'react-native-sqlite-storage';

export default async function useMountingPoints(dispatch) {
    const getDBConnection = async () => {
        return openDatabase({
            name: 'tabber.db',
            location: 'default',
        });
    };
    async function MntPnts() {

        // const db = await getDBConnection();

        // let query
        // let test = 0

        // query = `CREATE TABLE IF NOT EXISTS paths(
        //     id INTEGER PRIMARY KEY AUTOINCREMENT,
        //     path TEXT NOT NULL
        // )`;
        // if (test) {
        //     query = `DROP TABLE paths`
        // }
        // await db.executeSql(query, [], () => { }, (e) => { console.log("db error: ", e) });

        // query = `CREATE TABLE IF NOT EXISTS thumbnails(
        //     path_id INTEGER,
        //     name TEXT NOT NULL,
        //     modified_date TEXT NOT NULL
        // )`;
        // if (test) {
        //     query = `DROP TABLE thumbnails`
        // }
        // await db.executeSql(query, [], () => { }, (e) => { console.log("db error: ", e) });


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
                name: pathFull == RNFS.ExternalStorageDirectoryPath ? "Internal Storage" : "External Storage " + count,
                isFile: 0,
                isDirectory: 1
            })
            count++
        })
        return mntPnts
    }

    dispatch({
        type: "SETCACHE",
        payload: {
            Home: await MntPnts()
        }
    })

    if (await RNFS.exists(RNFS.ExternalCachesDirectoryPath + "/favorites.json")) {
        let favorites = await RNFS.readFile(RNFS.ExternalCachesDirectoryPath + "/favorites.json")
        dispatch({
            type: "SETFAVOURITEITEM",
            payload: JSON.parse(favorites)
        })
    } else {
        dispatch({
            type: "ABOUTMODAL"
        })
        await RNFS.writeFile(RNFS.ExternalCachesDirectoryPath + "/favorites.json", "[]")
    }

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