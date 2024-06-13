import React, { createContext, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, FlatList, Image, AppState } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Window from './Window';
import RNFS from 'react-native-fs';


const Context = createContext();

const App = () => {
    const [lastTabKey, setLastTabKey] = useState(0)
    const [filesCache, setFilesCache] = useState({})
    const [tabs, setTabs] = useState([{
        key: 0,
        title: `Tab ${lastTabKey}`,
        content: () => <Text>0</Text>
    }]);
    const [newlyLoadedFilesList, setNewlyLoadedFilesList] = useState([])
    const [operationTab, setOperationTab] = useState(-1)
    const [operationType, setOperationType] = useState(-1)
    const [progressType, setProgressType] = useState(-1)
    const [addedItems, setAddedItems] = useState([])
    const [removedItems, setRemovedItems] = useState([])

    const [bottomSheet, setBottomSheet] = useState(1)

    const [currTab, setCurrTab] = useState(0);
    const [currParentPath, setCurrParentPath] = useState(RNFS.ExternalStorageDirectoryPath)

    const [mediaType, setMediaType] = useState(0)
    const [index, setIndex] = useState(0);

    const loadFiles = async (path) => {
        let result = await RNFS.readDir(path)
        //sort by type
        let allFolders = result.filter(i => i.isDirectory())
        let allFiles = result.filter(i => i.isFile())
        result = [...allFolders, ...allFiles]
        return result
    };
    useEffect(() => {
        if (lastTabKey > 0) {
            setTabs([
                ...tabs,
                {
                    key: lastTabKey,
                    title: `Tab ${lastTabKey}`,
                    content: () => {
                        const contextValue = useContext(Context);
                        const [filesList, setFilesList] = useState([])
                        const [currPath, setCurrPath] = useState(RNFS.ExternalStorageDirectoryPath)
                        console.log(currPath)

                        const [searchTerm, setSearchTerm] = useState("")
                        const [searchCache, setSearchCache] = useState([])

                        const [selectionFlag, setSelectionFlag] = useState(0)
                        const [selectedItem, setSelectedItem] = useState([])
                        const [mediaType, setMediaType] = useState(0)

                        const [modalType, setModalType] = useState(0)


                        useEffect(() => {
                            const handleCurrPathUpdate = async () => {
                                setSelectedItem([])
                                if (currPath in contextValue.filesCache) {
                                    console.log("loaded from cache")
                                    setFilesList(contextValue.filesCache[currPath])
                                } else {
                                    console.log("build cache")
                                    let loadedFiles = await loadFiles(currPath)
                                    const tempFilesCache = { ...contextValue.filesCache }
                                    tempFilesCache[currPath] = loadedFiles
                                    contextValue.setFilesCache(tempFilesCache)
                                    setFilesList(loadedFiles)
                                }
                            }
                            handleCurrPathUpdate()
                        }, [currPath])
                        const Icon = (ext) => {
                            switch (ext) {
                                case "mp3":
                                    return (<Image source={require('./assets/music.png')} />)
                                default:
                                    return (<Text style={{ fontFamily: 'Pop-reg', color: '#979899', fontSize: 10 }}>{ext}</Text>)
                            }
                        }
                        return (<>

                            <FlatList
                                style={{ backgroundColor: '#06161C' }}
                                data={filesList}
                                keyExtractor={(item) => item.path}
                                renderItem={({ item }) => {
                                    let ext = ""
                                    if (item.isFile()) {
                                        const parts = item.name.split(".")
                                        ext = parts[parts.length - 1]
                                    }

                                    return (
                                        <TouchableOpacity onPress={() => {
                                            selectionFlag || searchTerm !== "" ? selectItem(item) : item.isDirectory() ? setCurrPath(item.path) : handleFile(item)
                                        }} onLongPress={() => { selectionFlag ? (!tab["selectedItems"].includes(item) ? rangeSelect(item) : {}) : selectItem(item) }}>

                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    gap: 20
                                                }}
                                            >
                                                <>
                                                    {item.isDirectory() ? <Image source={require('./assets/folder.png')} /> : Icon(ext)}
                                                </>
                                                <Text style={{ width: '80%', color: 'white' }}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                                }
                            />
                        </>)
                    }
                }]);
        }

    }, [lastTabKey])


    const renderScene = SceneMap(
        tabs.reduce((acc, tab) => {
            acc[tab.key] = tab.content;
            return acc;
        }, {})
    );

    const RenderTabBar = props => {
        return (
            <View style={{ flexDirection: 'row', width: Dimensions.get('window').width }}>
                <TabBar {...props}
                    scrollEnabled={true}
                    tabStyle={{ width: 'auto' }}
                    style={{ flex: 1 }} />
                <TouchableOpacity onPress={() =>
                    setLastTabKey(lastTabKey + 1)}>
                    <Text>Add</Text>
                </TouchableOpacity>
            </View>
        )
    };


    return (
        <View style={{ backgroundColor: '#06161C', flexDirection: 'column', flex: 1 }}>
            <Context.Provider value={{ filesCache, setFilesCache }}>
                <TabView
                    navigationState={{ index, routes: tabs }}
                    renderTabBar={RenderTabBar}
                    tabBarPosition='bottom'
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    animationEnabled={false}
                    swipeEnabled={false}
                />
            </Context.Provider>
            <TouchableOpacity onPress={() => console.log(filesCache)}>
                <Text>index</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.warn("-----------------")}>
                <Text>warn</Text>
            </TouchableOpacity>
            {/* <RenderTabBar navigationState={{ currTab, routes: tabs }} /> */}
        </View>
    );
};
export default App;
