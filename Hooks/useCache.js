import RNFS from 'react-native-fs';

export default async function useCache(dispatch, path) {
  // const getDBConnection = async () => {
  //     return openDatabase({
  //         name: 'tabber.db',
  //         location: 'default',
  //     });
  // };
  // const db = await getDBConnection();
  let pathFlag = 0;

  //check if path already exists in paths table
  let query = `SELECT * FROM paths WHERE path=?`;
  // await db.transaction((tx) => {
  //     tx.executeSql(query, [path], async (tx, results) => {
  //         console.log(results.rows.item(0))
  //         if (results.rows.length == 0) {
  //             pathFlag = 1
  //             //if no, insert path in table
  //             let query = `INSERT INTO paths(path) VALUES(?)`;
  //             await db.executeSql(query, [path], () => { }, (e) => { console.log("db error: ", e) });
  //         }
  //     })
  // }, (error) => {
  //     console.log(error);
  // });

  let dirData = [];
  try {
    dirData = await RNFS.readDir(path);
  } catch (error) {
    console.log(dirData);
  }
  dirData.map(item => {
    item['isDirectory'] = item.isDirectory();
    item['isFile'] = item.isFile();
    if (item['isFile']) {
      item['fileType'] = item['name'].split('.').pop();
      //and insert thumbnails in thumbnails table

      //   if (
      //     pathFlag &&
      //     (item['fileType'] == 'png' ||
      //       item['fileType'] == 'jpg' ||
      //       item['fileType'] == 'jpeg')
      //   ) {
      //     useThumbnail(item);
      //     // let query = `INSERT INTO thumbnails(path_id,name,modified_date) VALUES(?,?,?)`;
      //     // db.executeSql(query, [1, item["name"], 'ABCD'], () => { }, (e) => { console.log("db error: ", e) });
      //     console.log(RNFS.ExternalDirectoryPath + '/thumbnails/');
      //   }
    }
  });

  dispatch({
    type: 'UPDATECACHE',
    payload: {
      key: path,
      value: dirData,
    },
  });
}
