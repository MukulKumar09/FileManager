import styles from "./styles"
import { useEffect, useState } from "react";
import { BackHandler, FlatList, Image, Text, TouchableOpacity, View, ScrollView, ToastAndroid } from "react-native";
import RNFS from 'react-native-fs';
import MediaViewer from "./MediaViewer";
import FileViewer from "react-native-file-viewer";
import RenameModal from "./RenameModal";
import ConfirmDelete from "./ConfirmDelete";
import SearchModal from "./SearchModal"
function Window(props) {

    const [filesList, setFilesList] = useState([])
    const [currPath, setCurrPath] = useState(props.tab["path"])

    const [searchTerm, setSearchTerm] = useState("")
    const [searchCache, setSearchCache] = useState([])

    const [selectionFlag, setSelectionFlag] = useState(0)
    const [selectedItem, setSelectedItem] = useState([])
    const [mediaType, setMediaType] = useState(0)

    const [modalType, setModalType] = useState(0)

    const handleSearch = () => {
        if (searchTerm == "") {//if dialog submitted without entering any string, 
            if (searchCache.length > 0) { //and there's data in cache, load it in filesList
                setFilesList(searchCache)
                setSearchCache([])
            }//otherwise do nothing
        } else {
            if (searchCache.length == 0) { //if submitted with string, and cache is empty,
                setSearchCache([...filesList]) //fill the cache
                let tempFilesList = [...filesList]
                tempFilesList = tempFilesList.filter(i => i.name.includes(searchTerm))
                setFilesList(tempFilesList)
            } else { //otherwise, use cache for subsequent searches
                let tempFilesList = [...searchCache]
                tempFilesList = tempFilesList.filter(i => i.name.includes(searchTerm))
                setFilesList(tempFilesList)
            }
        }
    }

    useEffect(() => {
        console.log("useEffect ran")
    }, [mediaType])
    let crumbPaths = []
    let breadCrumbs = props.tab.path == RNFS.ExternalStorageDirectoryPath ? [] : props.tab.path.replace(RNFS.ExternalStorageDirectoryPath + "/", "").split("/");
    const handleFolder = (item) => {
        setMediaType(0)
        setCurrPath(item.path)
    }
    const handleFile = (item) => {
        setSelectedItem(item)
        const parts = item.name.split(".")
        const ext = parts[parts.length - 1]
        if (["jpeg", "png", "jpg", "gif"].includes(ext)) {
            setMediaType(1)
        }
        else if (["mp4", "mp3", "avi", "mkv", "wav", "mid"].includes(ext)) {
            setMediaType(2)
        } else {
            openExternally(item.path)
            setMediaType(0)
        }
        console.log("handle file: " + item.path)

    }
    const openExternally = (file) => {
        console.log("open external: " + file)
        FileViewer.open(file, { showOpenWithDialog: true }) // absolute-path-to-my-local-file.
            .then(() => {
                // success
            })
            .catch((error) => {
                alert('No apps found')
            });
    }
    const selectItem = (item) => {

        setMediaType(0)
        setSelectionFlag(1)
        setSelectedItem(item)
        let tempTabs = { ...props.tabs }
        if (tempTabs[props.currTab]["selectedItems"].includes(item)) {//deselect
            tempTabs[props.currTab]["selectedItems"] = tempTabs[props.currTab]["selectedItems"].filter((i) => i.path !== item.path)
            if (tempTabs[props.currTab]["selectedItems"].length == 0)
                setSelectionFlag(0)
        } else {
            tempTabs[props.currTab]["selectedItems"].push(item)
        }
        props.setTabs(tempTabs)
    }
    const rangeSelect = (item) => {
        let tempTabs = { ...props.tabs }
        setSelectedItem(item)
        const lastSelectedItem = tempTabs[props.currTab]["selectedItems"][tempTabs[props.currTab]["selectedItems"].length - 1]
        const lastSelectedItemIndexInFilesList = filesList.indexOf(lastSelectedItem)
        const newSelectedItemIndexInFilesList = filesList.indexOf(item)
        if (newSelectedItemIndexInFilesList > lastSelectedItemIndexInFilesList) { //downwards
            for (let i = lastSelectedItemIndexInFilesList + 1; i <= newSelectedItemIndexInFilesList; i++) {
                !tempTabs[props.currTab]["selectedItems"].includes(filesList[i]) && tempTabs[props.currTab]["selectedItems"].push(filesList[i])
            }
        } else {
            for (let i = newSelectedItemIndexInFilesList; i <= lastSelectedItemIndexInFilesList - 1; i++) {
                !tempTabs[props.currTab]["selectedItems"].includes(filesList[i]) && tempTabs[props.currTab]["selectedItems"].push(filesList[i])
            }
        }
        props.setTabs(tempTabs)
    }
    const deselectAll = () => {
        setSelectionFlag(0)
        props.setOperationType(-1)
        let tempTabs = { ...props.tabs }
        tempTabs[props.currTab]["selectedItems"] = []
        props.setTabs(tempTabs)
    }

    const copyItems = () => {
        props.setOperationTab(props.thisTabNo);
        props.setOperationType(1)
        ToastAndroid.showWithGravity(
            props.tab["selectedItems"].length + " Items Copied",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    }
    const moveItems = () => {
        props.setOperationTab(props.thisTabNo);
        props.setOperationType(0)
        ToastAndroid.showWithGravity(
            props.tab["selectedItems"].length + " Items ready to Move",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    }
    const pasteItems = async () => {
        await props.shiftItems()

    }
    const deleteItems = async () => {
        props.setOperationTab(props.thisTabNo);
        props.setOperationType(2)
        setModalType(2)
    }
    const confirmDelete = async () => {
        const deleteResult = await props.deleteItems()
        if (deleteResult.length == 0) {
            ToastAndroid.showWithGravity(
                "Items Deleted.",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
        else {
            console.log(deleteResult)
            ToastAndroid.showWithGravity(
                "Some items couldn't be deleted.",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
        setSelectionFlag(0)
        setSelectedItem([])
        props.setOperationType(-1)
    }

    //add new items
    useEffect(() => {
        console.log("useEffect ran")
        if (props.addedItem.length > 0 && props.addedItem[0]["path"].substring(0, props.addedItem[0]["path"].lastIndexOf("/")) == props.tab["path"]) {
            console.log("addItems triggered")
            //update filesList of all tabs where this path is opened
            //extract path from 1st item of addedItems and compare with tab path
            console.log("add items triggered")
            setFilesList([...filesList, ...props.addedItem])
        }
    }, [props.addedItem])

    //remove new items
    useEffect(() => {
        console.log("useEffect ran")
        //check if tab path is same
        if (props.removedItems.length > 0 && props.removedItems[0]["path"].substring(0, props.removedItems[0]["path"].lastIndexOf("/")) == props.tab["path"]) {
            console.log("removeItems triggered")
            //update filesList of all tabs where this path is opened
            //extract path from 1st item of addedItems and compare with tab path
            setSelectionFlag(0) //deselect all items of all tabs where this path is opened
            let tempTabs = { ...props.tabs }//deselect all items of all tabs where this path is opened
            tempTabs[props.operationTab]["selectedItems"] = []
            props.setTabs(tempTabs)
            setFilesList(filesList.filter((item) => !props.removedItems.includes(item)))
        }
    }, [props.removedItems])

    useEffect(() => {
        console.log("load files ran")
        const loadFiles = async () => {
            console.log("i ran")
            setSelectedItem([])
            setFilesList(await props.loadFiles(currPath))
            let tempTabs = { ...props.tabs }
            tempTabs[props.currTab]["path"] = currPath
            let folderName = ""
            if (currPath == RNFS.ExternalStorageDirectoryPath) {
                folderName = "Internal Storage"
            } else {
                const parts = currPath.split("/")
                folderName = parts[parts.length - 1]
            }
            tempTabs[props.currTab]["name"] = folderName
            props.setTabs(tempTabs)
        }
        loadFiles()
        // const backAction = () => {
        //     if (props.thisTabNo == props.currTab && mediaType > 0) {
        //         setMediaType(0)
        //         return true;
        //     }
        //     if (modalType > 0) {
        //         setModalType(0)
        //         return true;
        //     }
        //     if (props.thisTabNo == props.currTab && currPath !== RNFS.ExternalStorageDirectoryPath) {
        //         setCurrPath(props.navigateUp(currPath))
        //         setMediaType(0)
        //         setSelectionFlag(0)
        //         setSelectedItem([])
        //         return true; // Prevent default behavior (exit the app)
        //     }
        //     return false; // Default behavior (exit the app)
        // };

        // const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        // return () => backHandler.remove();
    }, [currPath])
    // useEffect(() => { console.log(filesList) }, [filesList])
    const Icon = (ext) => {
        switch (ext) {
            case "mp3":
                return (<Image source={require('../assets/music.png')} />)
            default:
                return (<Text style={{ fontFamily: 'Pop-reg', color: '#979899', fontSize: 10 }}>{ext}</Text>)
        }
    }
    return (
        <View style={{
            //props.tab['visible']
            flex: 1,
            flexDirection: 'column'
        }}>
            {/* <TouchableOpacity onPress={() => console.warn("-----------")}><Text style={{ color: 'white' }}>Divvider {mediaType}</Text></TouchableOpacity> */}
            {/* <Text style={{ color: 'white' }}>{props.currTab, props.thisTabNo}</Text> */}
            {/* <Text style={{ fontSize: 8, color: 'white' }}>{
                Object.keys(props.tabs).map((keyAdd) => {
                    return (JSON.stringify(props.tabs[keyAdd]["selectedItems"]) + "\n\n")
                })
            }</Text> */}
            {/* <Text style={{ color: 'white' }}>{JSON.stringify(props.tab["selectedItems"])}</Text> */}

            {mediaType == 0 ? null :
                <MediaViewer
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    mediaType={mediaType}
                    setMediaType={setMediaType} />
            }
            {modalType == 1 ? <RenameModal
                path={props.tab['path']}
                filesList={filesList}
                setFilesList={setFilesList}
                setModalType={setModalType}
                selectedItem={selectedItem}
            /> : null}
            {modalType == 2 ? <ConfirmDelete
                confirmDelete={confirmDelete}
                setModalType={setModalType}
            /> : null}
            {modalType == 3 ?
                <>
                    <SearchModal
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearch={handleSearch}
                        setModalType={setModalType}
                    />
                </> : null}
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
                        <TouchableOpacity style={{ backgroundColor: props.tab["selectedItems"].includes(item) ? '#435860' : 'transparent', borderWidth: selectedItem == item ? 1 : 0, borderStyle: 'dashed', borderColor: 'white' }} onPress={() => {
                            selectionFlag || searchTerm !== "" ? selectItem(item) : item.isDirectory() ? handleFolder(item) : handleFile(item)
                        }} onLongPress={() => { selectionFlag ? (!props.tab["selectedItems"].includes(item) ? rangeSelect(item) : {}) : selectItem(item) }}>

                            <View
                                style={[{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 20
                                }, styles.padding]}
                            >
                                <>
                                    {item.isDirectory() ? <Image source={require('../assets/folder.png')} /> : Icon(ext)}
                                </>
                                <Text style={[styles.text, { width: '80%', color: 'white' }]}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
                }
            />


            {selectionFlag ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#152024', marginHorizontal: 20, marginTop: 10, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 }}>
                <Text style={{ color: '#979899', fontSize: 10 }}>{props.tab["selectedItems"].length} items selected</Text>
                <Text style={{ color: '#979899', fontSize: 10, textDecorationLine: 'underline' }} onPress={() => deselectAll()}>Deselect All</Text>
            </View>
                : ""}
            {searchTerm == "" ? null :
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#152024', marginHorizontal: 20, marginTop: 10, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                        <Text style={[styles.text, { color: '#979899', fontSize: 10 }]}>Found {filesList.length} items for "{searchTerm}"</Text>
                    </View>

                    <TouchableOpacity onPress={() => {
                        setSearchTerm("")
                        setFilesList(searchCache)
                        props.setProgressType(-1)
                    }}>
                        <Text style={[styles.text, { color: '#979899', fontSize: 10, textDecorationLine: 'underline' }]} >Close</Text>
                    </TouchableOpacity>
                </View>
            }
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <ScrollView
                    horizontal
                    snapToEnd={true}
                    style={{ flexGrow: 0 }}
                    showsHorizontalScrollIndicator={false}
                    style={{ transform: [{ scaleX: -1 }] }}

                >
                    <View style={{ transform: [{ scaleX: -1 }], flexDirection: 'row' }}>
                        <View style={{ backgroundColor: '#152024', marginHorizontal: 5, marginTop: 10, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 }}>
                            <Text style={{ color: '#979899', fontFamily: 'Pop-reg', fontSize: 10 }} onPress={() => deselectAll()}>Internal Storage</Text>
                        </View>
                        {
                            breadCrumbs.map((folder, indx) => {
                                crumbPaths.push(RNFS.ExternalStorageDirectoryPath + "/" + breadCrumbs.slice(0, indx + 1).join("/"))
                                return (
                                    <View key={indx} style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: 'white', fontFamily: 'Pop-reg', marginTop: 20, borderRadius: 20 }}>></Text>
                                        <TouchableOpacity style={{ backgroundColor: '#152024', marginHorizontal: 5, marginTop: 10, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 }} onPress={() => {
                                            setCurrPath(crumbPaths[indx])
                                            setMediaType(0)
                                            setSelectionFlag(0)
                                            setSelectedItem([])
                                        }}>
                                            <Text style={{ color: '#979899', fontFamily: 'Pop-reg', fontSize: 10 }}>{folder}</Text>
                                        </TouchableOpacity>
                                    </View>)
                            }
                            )
                        }
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => {
                    setCurrPath(props.navigateUp(currPath))
                    setMediaType(0)
                    setSelectionFlag(0)
                    setSelectedItem([])
                }} style={{ backgroundColor: '#152024', marginHorizontal: 5, marginTop: 10, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 }}>
                    <Text style={{ color: '#979899', fontFamily: 'Pop-reg', fontSize: 10 }} >Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { props.setBottomSheet(props.bottomSheet ? 0 : 1) }} style={{ backgroundColor: '#152024', marginHorizontal: 5, marginTop: 10, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 }}>
                    <Text style={{ color: '#979899', fontFamily: 'Pop-reg', fontSize: 10 }} >•••</Text>
                </TouchableOpacity>
            </View>

            <View>
                <ScrollView
                    horizontal
                    style={{ display: props.bottomSheet ? "flex" : "none", marginTop: 10, transform: [{ scaleX: -1 }] }}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={{ flexDirection: 'row', gap: 10, transform: [{ scaleX: -1 }] }}>
                        {selectionFlag ?
                            <>
                                <TouchableOpacity style={{
                                    backgroundColor: '#152024',
                                    padding: 20,
                                    borderRadius: 40,
                                }} onPress={() => deleteItems()}>
                                    <Image source={require('../assets/delete.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    backgroundColor: '#152024',
                                    padding: 20,
                                    borderRadius: 40,
                                }} onPress={() => deleteItems()}>
                                    <Image source={require('../assets/newtab.png')} />
                                </TouchableOpacity>
                                {props.tab["selectedItems"].length == 1 ? <TouchableOpacity style={{
                                    backgroundColor: '#152024',
                                    padding: 20,
                                    borderRadius: 40,
                                }} onPress={() => setModalType(1)}>
                                    <Image source={require('../assets/rename.png')} />
                                </TouchableOpacity> : ""}

                                <TouchableOpacity style={{
                                    backgroundColor: '#152024',
                                    padding: 20,
                                    borderRadius: 40,
                                }}>
                                    <Image source={require('../assets/share.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => moveItems()} style={{
                                    backgroundColor: '#152024',
                                    padding: 20,
                                    borderRadius: 40,
                                }}>
                                    <Image source={require('../assets/move.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => copyItems()} style={{
                                    backgroundColor: '#152024',
                                    padding: 20,
                                    borderRadius: 40,
                                }}>
                                    <Image source={require('../assets/copy.png')} />
                                </TouchableOpacity>
                            </> :
                            <>
                                <TouchableOpacity style={{
                                    backgroundColor: '#152024',
                                    padding: 20,
                                    borderRadius: 40,
                                }}>
                                    <Image source={require('../assets/newfolder.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    backgroundColor: '#152024',
                                    padding: 20,
                                    borderRadius: 40,
                                }}>
                                    <Image source={require('../assets/newfile.png')} />
                                </TouchableOpacity>
                                {selectedItem.length !== 0 ? <TouchableOpacity onPress={() => openExternally(selectedItem.path)} style={{
                                    backgroundColor: '#152024',
                                    padding: 20,
                                    borderRadius: 40,
                                }}>
                                    <Image source={require('../assets/openwith.png')} />
                                </TouchableOpacity> : ""}
                            </>
                        }

                        <TouchableOpacity style={[styles.button, styles.buttonBasic, styles.padding, styles.button]} onPress={() => {
                            setModalType(3);
                        }
                        }>
                            <Image source={require('../assets/search.png')} />
                        </TouchableOpacity>
                        {props.operationType === 0 || props.operationType === 1 ? <TouchableOpacity style={{
                            backgroundColor: '#152024',
                            padding: 20,
                            borderWidth: 2,
                            borderColor: '#435860',
                            borderRadius: 40,
                        }} onPress={() => pasteItems()}>
                            <Image source={require('../assets/file.png')} />
                        </TouchableOpacity> : null}
                    </View>
                </ScrollView>
            </View >
        </View >
    )
}
export default Window