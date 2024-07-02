import RNFS from 'react-native-fs';
import { cacheDbConnect } from '../getDbConnection/cacheDbConnect';

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
                isDirectory: () => 1,
                isFile: () => 0,
                name: pathFull == RNFS.ExternalStorageDirectoryPath ? "Internal Storage" : "External Storage " + count,
            })
            count++
        })
        return mntPnts
    }

    // let db = await cacheDbConnect()
    // let directories = await new Promise((resolve, reject) => {
    //     db.transaction((tx) => {
    //         tx.executeSql(
    //             'SELECT * FROM Directories',
    //             [],
    //             (tx, result) => {
    //                 resolve(result.rows.raw())
    //             },
    //             (tx, reject) => {
    //                 resolve(undefined)
    //             }
    //         )
    //     }
    //     )
    // })
    // // let filesList = await new Promise((resolve, reject) => {
    // //     db.transaction((tx) => {
    // //         tx.executeSql('SELECT * FROM FilesList', [], (tx, result) =>
    // //             resolve(result.rows.raw())
    // //         )
    // //     })
    // // })
    // if (directories == undefined) {
    //     const sqlAsync = async () => {
    //         await db.executeSql('CREATE TABLE Directories (path TEXT, modifiedDate DATE)');
    //         await db.executeSql('CREATE TABLE FilesList (path TEXT,name TEXT,isDirectory() TEXT,isFile() TEXT)');
    //         await db.executeSql('INSERT INTO Directories (path) VALUES ("Home")');
    //         await db.executeSql('INSERT INTO FilesList (path) VALUES ("path")');
    //     }
    //     sqlAsync()
    // }
    // else if (directories.find(directory => directory.path == "Home") == undefined) {
    //     const sqlAsync = async () => {
    //         await db.executeSql('INSERT INTO Directories (path) VALUES ("Home")');
    //         await db.executeSql('INSERT INTO FilesList (path) VALUES ("path")');
    //     }
    //     sqlAsync()
    // } else {
    //     console.log("all fine")
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