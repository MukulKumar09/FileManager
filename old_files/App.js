import { useEffect, useRef, useState, useImperativeHandle, forwardRef, useMemo } from "react";
import { Text, TouchableOpacity, View, FlatList, Image, ScrollView, Dimensions } from "react-native";
import RNFS from 'react-native-fs';

const folderName = (path) => {
    if (path == RNFS.ExternalStorageDirectoryPath) {
        return "Internal Storage"
    }
    console.log(path)
    const parts = path.split('/');
    const folderName = parts[parts.length - 1];
    return folderName
}
const loadFiles = async (path) => {
    console.log("loadfiles ran")
    let result = await RNFS.readDir(path)
    //sort by type
    let allFolders = result.filter(i => i.isDirectory())
    let allFiles = result.filter(i => i.isFile())
    result = [...allFolders, ...allFiles]
    return result
};
const Window = forwardRef((props, ref) => {
    const [currPath, setCurrPath] = useState(RNFS.ExternalStorageDirectoryPath)
    const [filesList, setFilesList] = useState([])
    const [selectionFlag, setSelectionFlag] = useState(0)
    const [searchTerm, setSearchTerm] = useState("")
    const [breadCrumbs, setBreadCrumbs] = useState([])

    useImperativeHandle(ref, () => ({
        rerender: () => {
            const waitCache = async () => {
                console.log("everyone pulled cache")
                setFilesList(await props.setgetCache(currPath))
            }
            waitCache()
        }
    }));

    useEffect(() => { //first step
        console.log("currpath useeffect reran")
        const waitCache = async () => {
            setFilesList(await props.setgetCache(currPath))
        }
        waitCache()
        setBreadCrumbs(props.bringBreadCrumbs(currPath))
        //setFilesList(props.setgetCache(currPath))
        props.tabNames.current[props.index] = folderName(currPath)
        props.buttonRefs.current[props.index].rerender()


    }, [currPath])

    const Icon = (ext) => {
        switch (ext) {
            case "mp3":
                return (<Image source={require('../assets/music.png')} />)
            default:
                return (<Text>{ext}</Text>)
        }
    }

    return (
        <View>
            <FlatList
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
                                style={{ flexDirection: "row" }}
                            >
                                <>
                                    {item.isDirectory() ? <Image source={require('../assets/folder.png')} /> : Icon(ext)}
                                </>
                                <Text>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
                }
            />
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => setCurrPath(RNFS.ExternalStorageDirectoryPath)}><Text>Internal Storage</Text></TouchableOpacity>
                {//convert this to ref control
                    breadCrumbs.map((folder, i) => {
                        console.log()
                        return (
                            <TouchableOpacity key={i} onPress={() => setCurrPath(RNFS.ExternalStorageDirectoryPath + "/" + breadCrumbs.slice(0, (i + 1)).join("/"))}><Text> > {folder}</Text></TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>)
});

const App = () => {
    const filesCache = useRef({})
    const buttonRefs = useRef([])
    const windowRefs = useRef([])
    const tabNames = useRef([])
    const currTabStatic = useRef(0)
    const scrollViewRef = useRef(null)
    const scrollToPosition = (x, y) => {
        scrollViewRef.current.scrollTo({ x, y, animated: false })
    }
    const [tabs, setTabs] = useState([])
    const [tabCounter, setTabCounter] = useState(0)
    let width = Dimensions.get('window').width

    useEffect(() => {
        setTabs([...tabs, tabCounter])
    }, [tabCounter])

    const setgetCache = async (path) => {
        if (path in filesCache.current) {
            console.log("loaded cache")
            return filesCache.current[path]
        } else {
            console.log("built cache")
            filesCache.current[path] = await loadFiles(path)
            return filesCache.current[path]
        }
    }

    const bringBreadCrumbs = (path) => {
        path = path.replace("/storage/emulated/0", "")
        path = path.split("/")
        path.shift()
        console.log("mainf: ", path)
        return path
    }

    const deleteTab = () => {
        const deleteLogic = () => {
            let tempTabs = [...tabs]
            tempTabs = tempTabs.filter((i) => i != tabs[currTabStatic.current])
            console.log(tempTabs)
            setTabs(tempTabs)
            buttonRefs.current = buttonRefs.current.filter((i) => i != buttonRefs.current[currTabStatic.current])
            tabNames.current = tabNames.current.filter((i) => i != tabNames.current[currTabStatic.current])
        }
        if (tabs[currTabStatic.current + 1] == undefined) { //last
            scrollToPosition(width * (currTabStatic.current - 1), 0)
            deleteLogic()
            currTabStatic.current = currTabStatic.current - 1
        } else {//mid
            deleteLogic()
        }
        // setCurrTab(actTab.toString())
    }



    const TabButton = forwardRef((props, ref) => {
        const [rerend, setRerend] = useState(0)
        useImperativeHandle(ref, () => ({
            rerender: () => {
                console.log("Rerender called")
                setRerend(!rerend)
            }
        }));
        return (<View style={{ flexDirection: 'row', padding: 10 }}>
            <TouchableOpacity
                onPress={() => {
                    scrollToPosition(width * props.index, 0)
                    buttonRefs.current[currTabStatic.current].rerender()
                    currTabStatic.current = props.index
                    buttonRefs.current[props.index].rerender()
                }}>
                <Text
                    style={{ paddingHorizontal: 10 }}
                >{tabNames.current[props.index]}</Text>
            </TouchableOpacity>
            {currTabStatic.current == props.index ?
                <TouchableOpacity
                    style={{ paddingHorizontal: 10 }}
                    onPress={() => { deleteTab() }}><Text>X</Text></TouchableOpacity>
                : null}
        </View>)
    })
    const refreshAllTabs = () => { //pull latest cache in all tabs
        windowRefs.current.forEach(childRef => {
            childRef.rerender();
        });
    };

    return (
        <>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled={true}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={{ flexDirection: 'row' }}>
                    {useMemo(() => (
                        tabs.map((index, i) => {

                            console.log("window map")
                            return (
                                <View key={i} style={{ width: width }}>
                                    <Window
                                        setgetCache={setgetCache}
                                        bringBreadCrumbs={bringBreadCrumbs}
                                        index={i}
                                        tabNames={tabNames} //for updating tabname when folder click
                                        buttonRefs={buttonRefs}
                                        ref={ref => { windowRefs.current[i] = ref }}
                                    />
                                </View>
                            )
                        }
                        )
                    )
                        , [tabs])
                    }

                </View>
            </ScrollView>
            <TouchableOpacity onPress={() => refreshAllTabs()}><Text>Refresh All</Text></TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                {useMemo(() => (
                    tabs.map((index, i) => {
                        console.log("button map")
                        return (
                            <View key={i}>
                                <TabButton
                                    index={i}
                                    ref={ref => { buttonRefs.current[i] = ref }}
                                />

                            </View>
                        )
                    }
                    ))
                    , [tabs])
                }
                <TouchableOpacity onPress={() => { setTabCounter(tabCounter + 1) }}><Text>+</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { console.warn(tabNames, "---------") }}><Text>Divider</Text></TouchableOpacity>
            </View>
            {/* <TouchableOpacity onPress={() => { deleteTab() }} style={{ padding: 10 }}><Text>X</Text></TouchableOpacity> //faster global close */}
        </>
    );
};
export default App