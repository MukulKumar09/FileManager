import { useState, useEffect } from 'react';
import RNFS from 'react-native-fs';
import { BackHandler, TouchableOpacity, Text, FlatList, View, useWindowDimensions, Button, ScrollView } from 'react-native';
import { TabView } from 'react-native-tab-view';
function App() {

  const [tabNo, setTabNo] = useState(1);

  const [filesList, setFilesList] = useState([])
  const [currentPath, setCurrentPath] = useState(RNFS.ExternalStorageDirectoryPath);

  const loadFiles = async (path) => {
    showFiles(tabNo)
    let result = await RNFS.readDir(path);
    setFilesList({
      ...filesList,
      [tabNo]: result
    })
  };

  const navigateUp = () => {
    const parts = currentPath.split('/');
    parts.pop();
    const parentPath = parts.join('/');
    setCurrentPath(parentPath);
  };

  const handleFilePress = (file) => {
    if (file.isDirectory()) {
      setCurrentPath(file.path);
    } else {
      console.log('File pressed:', file);
    }
  };
  useEffect(() => {
    loadFiles(currentPath);
    const backAction = () => {
      if (currentPath !== RNFS.ExternalStorageDirectoryPath) {
        navigateUp();
        return true; // Prevent default behavior (exit the app)
      }
      return false; // Default behavior (exit the app)
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();

  }, [currentPath]);


  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([{ key: tabNo, title: 'First' },
  ]);
  const addNewTab = () => {
    setTabNo(tabNo + 1)
    setIndex(tabNo);
    setRoutes([
      ...routes,
      { key: String(routes.length + 1), title: `Tab ${routes.length + 1}` },
    ])
    loadFiles(currentPath)
  }
  const showFiles = (data) => {
    console.log(data)
  }
  const renderTabBar = (props) => (
    <ScrollView
      horizontal
      style={{ flexGrow: 0 }}
      showsHorizontalScrollIndicator={false}
    ><Button onPress={() => showFiles()} title='Show' />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {props.navigationState.routes.map((route, idx) => (
          <TouchableOpacity
            key={route.key}
            onPress={() => {
              setIndex(idx);
              setTabNo(route.key);
            }}
            style={{
              padding: 16,
              borderBottomWidth: index === idx ? 2 : 0,
              borderBottomColor: 'blue',
            }}
          >
            <Text>{route.title}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => addNewTab()} style={{ padding: 16 }}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    </ScrollView >
  );
  const renderScene = ({ route }) => (
    <FlatList
      data={filesList[route["key"]]}
      keyExtractor={(item) => item.path}
      renderItem={({ item }) => {
        return (<TouchableOpacity onLongPress={() => { setSelectionFlag(1); addSelectedItem(item) }} onPress={() => handleFilePress(item)}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
          >
            <Text>{item.name}</Text>
          </View>
        </TouchableOpacity>
        )
      }
      }
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: useWindowDimensions().width }}
      />
    </View>
  )
}
export default App;