import {useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Window from './Window';
import styles from './styles';
import ToolBar from './Features/ToolBar/ToolBar';
import Tabbar from './Features/Tabbar/Tabbar';
import Modals from './Modals/Modals';
import useMountingPoints from './Hooks/useMountingPoints';
import OperationWindow from './Features/OperationWindow/OperationWindow';
import Webview from './Features/Webview/Webview';
import MediaViewer from './Features/MediaViewer/MediaViewer';

const App = () => {
  const dispatch = useDispatch();
  const state = {
    tabs: useSelector(state => state.tabs),
    operationWindow: useSelector(state => state.operationWindow),
    currentTab: useSelector(state => state.currentTab),
    cache: useSelector(state => state.cache['Home']),
    mediaBox: useSelector(state => state.mediaBox),
  };

  // const getDBConnection = async () => {
  //     return openDatabase({
  //         name: 'tabber.db',
  //         location: 'default',
  //     });
  // };
  // const getAllTasks = async () => {
  //     const db = await getDBConnection();

  //     let query = "SELECT * FROM paths;";
  //     await db.transaction((tx) => {
  //         tx.executeSql(query, [], (tx, results) => {
  //             console.log(results.rows)
  //         })
  //         // return tx
  //     }, (error) => {
  //         console.log(error);
  //     });
  //     query = "SELECT * FROM thumbnails;";
  //     await db.transaction((tx) => {
  //         tx.executeSql(query, [], (tx, results) => {
  //             console.log(results.rows)
  //         })
  //         // return tx
  //     }, (error) => {
  //         console.log(error);
  //     });
  // };

  let width = Dimensions.get('window').width;

  useEffect(() => {
    //first find all mounting points
    useMountingPoints(dispatch);
  }, []);

  return (
    <View style={[styles.mainBody]}>
      {/* <Home /> */}
      <Modals />
      {Boolean(state.mediaBox) && <MediaViewer />}
      <View
        style={{
          flex: 1,
        }}>
        {Object.keys(state.tabs).map(index => {
          switch (state.tabs[index]['type']) {
            case 'filebrowser': {
              return (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    display: state.currentTab == index ? 'flex' : 'none',
                  }}>
                  <Window index={index} />
                </View>
              );
            }
            case 'webview': {
              return (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    display: state.currentTab == index ? 'flex' : 'none',
                  }}>
                  <Webview index={index} />
                </View>
              );
            }
          }
        })}
      </View>
      {Boolean(state.operationWindow) && <OperationWindow />}
      {/* {Boolean(state.tabs[state.currentTab]) && state.tabs[state.currentTab]['type'] == 'filebrowser' && <ToolBar />} */}
      <Tabbar width={width} />
      {/* <Pressable onPress={() => getAllTasks()}><Text>All data</Text></Pressable> */}
    </View>
  );
};
export default App;
