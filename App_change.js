import {useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Window from './Layout/Windows/Window/Window';
import styles from './styles/styles';
import Tabbar from './Layout/Tabs/Tabbar';
import useAppLaunch from './Hooks/useAppLaunch';

const App = () => {
  const dispatch = useDispatch();
  const state = {
    tabs: useSelector(state => state.tabs),
    operationWindow: useSelector(state => state.operationWindow),
    currentTab: useSelector(state => state.currentTab),
    cache: useSelector(state => state.cache['Home']),
    mediaBox: useSelector(state => state.mediaBox),
  };

  let width = Dimensions.get('window').width;

  useEffect(() => {
    useAppLaunch(dispatch);
  }, []);

  return (
    <View style={[styles.mainBody]}>
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
            // case 'webview': {
            //   return (
            //     <View
            //       key={index}
            //       style={{
            //         flex: 1,
            //         display: state.currentTab == index ? 'flex' : 'none',
            //       }}>
            //       <Webview index={index} />
            //     </View>
            //   );
            // }
          }
        })}
      </View>
      <Tabbar width={width} />
    </View>
  );
};
export default App;
