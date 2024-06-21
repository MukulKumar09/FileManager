import { useEffect, useReducer, useRef, useState } from "react";
import { Text, View, Dimensions, Image, ToastAndroid, Pressable } from "react-native";
import { CombinedReducersContext, CombinedDispatchContext } from "./Context/Context"
import ClipBoardReducer from "./Reducers/ClipBoardReducer"
import ToastReducer from "./Reducers/ToastReducer"
import RNFS from 'react-native-fs';
import { Easing, ReduceMotion, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import FileViewer from "react-native-file-viewer";
import { zip } from 'react-native-zip-archive';
import Window from "./Window";
import styles from "./styles";
import ToolBar from "./Features/ToolBar/ToolBar";
import Tabbar from "./Features/Tabbar/Tabbar";
import MediaWindow from "./Features/MediaWindow/MediaWindow";
import Modals from "./Modals/Modals";
import OperationTypeReducer from "./Reducers/OperationTypeReducer";
import OperationDestReducer from "./Reducers/OperationDestReducer";
import OperationSourceReducer from "./Reducers/OperationSourceReducer";
import FunctionIdReducer from "./Reducers/FunctionIDReducer";
import CacheReducer from "./Reducers/CacheReducer";
import CurrentTabReducer from "./Reducers/CurrentTabReducer";
import TabsReducer from "./Reducers/TabsReducer";
import TabCounterReducer from "./Reducers/TabCounterReducer";

const showToast = (message) => {
    ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
    )
}
const App = () => {

    const initialState = {
        cache: {},
        tabs: {},
        tabCounter: 0,
        currentTab: 0,
        clipboardItems: [],
        operationType: -1,
        operationDest: "",
        operationSource: "",
        functionId: -1
    }
    const combineReducers = (state, action) => ({
        tabs: TabsReducer(state.tabs, action),
        tabCounter: TabCounterReducer(state.tabCounter, action),
        cache: CacheReducer(state.cache, action),
        currentTab: CurrentTabReducer(state.currentTab, action),
        clipboardItems: ClipBoardReducer(state.clipboardItems, action),
        operationType: OperationTypeReducer(state.operationType, action),
        operationSource: OperationSourceReducer(state.operationSource, action),
        operationDest: OperationDestReducer(state.operationDest, action),
        functionId: FunctionIdReducer(state.functionId, action),
        toast: ToastReducer(state.toast, action)
    })
    const [state, dispatch] = useReducer(combineReducers, initialState);

    const [favPaths, setFavPaths] = useState([]) //find all mounting points
    const [forceRefresh, setForceRefresh] = useState(0)

    useEffect(() => {
        console.log("ran mount init")
        let tempFavPaths = []
        const initExtPath = async () => {
            let allMounts = await RNFS.getAllExternalFilesDirs()
            allMounts.map((i) => {
                let count = 1
                let temp = i.split("/")
                let indx = temp.indexOf("Android")
                temp.length = indx
                let pathFull = temp.join("/")
                tempFavPaths.push({
                    path: pathFull,
                    isDirectory: () => 1,
                    isFile: () => 0,
                    name: pathFull == RNFS.ExternalStorageDirectoryPath ? "Internal Storage" : "External Storage " + count,
                })
                count++
            })
            setFavPaths(tempFavPaths)
        }
        initExtPath()
        dispatch({
            type: "RESETTABS"
        })
    }, [])
    useEffect(() => {
        dispatch({
            type: "UPDATECACHE",
            payload: {
                key: "Home",
                value: favPaths
            }
        })
    }, [favPaths])
    const [mainCache, setMainCache] = useState({})

    // const windowRefs = useRef([])

    const currTabStatic = useRef("0") //to set tab path with latest currtab value

    const [favouriteItems, setFavouriteItems] = useState([])

    //modals
    const [contextMenu, setContextMenu] = useState(0)
    const [progressModal, setProgressModal] = useState(0)
    const [inputModal, setInputModal] = useState(0)
    const [itemExistsModal, setItemExistsModal] = useState(0)
    const [favouritesModal, setFavouritesModal] = useState(0)
    const [clipBoardModal, setClipBoardModal] = useState(0)
    const [deleteModal, setDeleteModal] = useState(0)
    const [aboutModal, setAboutModal] = useState(0)

    //copy move delete
    const deleteRef = useRef("")
    const [breakOperation, setBreakOperation] = useState(0)
    const [showPaste, setShowPaste] = useState(0)
    const progressWidth = useSharedValue(0);
    const [progress, setProgress] = useState(0)
    const height = useSharedValue(0);
    const animatedWidthStyle = useAnimatedStyle(() => ({
        width: `${progressWidth.value}%`
    })
    )
    const [alreadyExists, setAlreadyExists] = useState(0)
    const inputRef = useRef("")

    const failedItems = useRef([])
    const [selectedItem, setSelectedItem] = useState([]) //for media
    const decisionRef = useRef("")

    const [mediaType, setMediaType] = useState(0)
    const [mediaBox, setMediaBox] = useState(0)

    const nameNewItem = useRef("")


    let width = Dimensions.get('window').width

    const buildCache = async (path) => {
        let dirListing
        try {
            dirListing = await RNFS.readDir(path)
        } catch (e) {
            console.log(e)
            dispatch({
                type: "TOAST",
                payload: "Error loading folder"
            })
            dirListing = []
        }
        dispatch({
            type: "ADDTOCACHE",
            payload: {
                key: path,
                value: dirListing
            }
        })
        console.log("build cache")
        return 1
    }

    const breadCrumbsTabName = () => {
        let path = state.tabs[state.currentTab]["path"]

        if (path == "Home") {
            return []
        } else {
            let obj = []
            let basePath
            let baseName
            for (let i = 0; i < favPaths.length; i++) {
                if (path.includes(favPaths[i]["path"])) {
                    basePath = favPaths[i]["path"]
                    baseName = favPaths[i]["name"]
                    break
                }
            }
            path = path.replace(basePath, baseName)
            path = path.split("/")
            path.map((i, j) => {
                obj.push({
                    "name": i,
                    "path": basePath
                })
                basePath = basePath + "/" + path[j + 1]
            })
            return obj
        }
    }

    useEffect(() => {
        if (mediaBox == 0) {
            height.value =
                withTiming(0, {
                    duration: 730,
                    easing: Easing.out(Easing.exp),
                    reduceMotion: ReduceMotion.System,
                }
                )
            setMediaType(0)
        } else {
            height.value =
                withTiming((height.value + Math.round(Dimensions.get('window').width * 9 / 16 + 60)), {
                    duration: 730,
                    easing: Easing.out(Easing.exp),
                    reduceMotion: ReduceMotion.System,
                })
        }
    }, [mediaBox]);

    useEffect(() => {
        progressWidth.value =
            withTiming(progress, {
                duration: 730,
                easing: Easing.out(Easing.exp),
                reduceMotion: ReduceMotion.System,
            }
            )
    }, [progress])


    const fileHandler = (item) => {
        setSelectedItem(item)
        const parts = item.name.split(".")
        const ext = parts[parts.length - 1]
        if (["jpeg", "png", "jpg", "gif"].includes(ext.toLowerCase())) {
            setMediaType(1)
            setMediaBox(1)
        }
        else if (["mp4", "mp3", "avi", "mkv", "wav", "mid"].includes(ext)) {
            setMediaType(2)
            setMediaBox(1)
        } else {
            setMediaBox(0)
            openExternally(item.path)
        }


    }

    const openExternally = (file) => {
        FileViewer.open(file, { showOpenWithDialog: true }) // absolute-path-to-my-local-file.
            .then(() => {
                // success
            })
            .catch((error) => {
                console.log(error)
                alert('No apps found')
            });
    }

    const newItem = async (type) => {
        let path = state.tabs[state.currentTab]["path"]
        if (type == 0) {
            setInputModal("Folder")
        } else {
            setInputModal("File")
        }
        const value = await new Promise((resolve) => {
            inputRef.current = { resolve }
        })
        setInputModal(0)
        if (type == 0) {
            await RNFS.mkdir(path + "/" + value)
            await buildCache(path)
            ToastAndroid.showWithGravity(
                "Folder created",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        } else {
            await RNFS.writeFile(path + "/" + value, "")
            await buildCache(path)
            ToastAndroid.showWithGravity(
                "File created",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
    }

    const selectItem = (selectedItems, item) => {

        if (selectedItems.includes(item)) {//deselect
            selectedItems = selectedItems.filter((i) => i.path !== item.path)
            if (selectedItems.length == 0)
                return []//indi
        } else {
            selectedItems.push(item)
        }
        return selectedItems
    }

    const StageItems = (type, selectedItems) => { //from source tab
        dispatch({
            type: "FUNCTIONID",
            payload: -1
        })
        dispatch({
            type: 'COPYTOCB',
            payload: selectedItems
        })
        dispatch({
            type: "OPERATIONSOURCE",
            payload: state.tabs[state.currentTab]["path"],
        })
        switch (type) {
            case 0:
            case 1: {
                dispatch({
                    type: "OPERATIONTYPE",
                    payload: type,
                })
                if (selectedItems.length == 0) {
                    dispatch({
                        type: "TOAST",
                        payload:
                            "No items selected to " + (type ? "move" : "copy"),
                    })
                } else {
                    dispatch({
                        type: "TOAST",
                        payload:
                            selectedItems.length + " items " + (type ? "ready to move" : "copied"),
                    })
                }
                break
            }
            case 2: {
                dispatch({
                    type: "OPERATIONTYPE",
                    payload: type,
                })
                dispatch({
                    type: "OPERATIONDEST",
                    payload: state.tabs[state.currentTab]["path"],
                })
                deleteHandler()
                break
            }
            case 3: {
                setShowPaste(0)
                dispatch({
                    type: "OPERATIONTYPE",
                    payload: 1,
                })
                dispatch({
                    type: "OPERATIONDEST",
                    payload: state.tabs[state.currentTab]["path"],
                })
                nameNewItem.current = state.clipboardItems["name"]
                renameHandler(state.clipboardItems)
                break
            }
            case 4: {
                dispatch({
                    type: "OPERATIONTYPE",
                    payload: type,
                })
                dispatch({
                    type: "OPERATIONDEST",
                    payload: state.tabs[state.currentTab]["path"],
                })
                zipHandler()
                break
            }
        }
    }



    const startShifting = async () => {
        setShowPaste(0)
        dispatch({
            type: "OPERATIONDEST",
            payload: state.tabs[state.currentTab]["path"],
        })
        let collectedItems = []
        const collectFilesFromFolder = async () => {
            for (let i = 0; i < state.clipboardItems.length; i++) {
                let item = state.clipboardItems[i]
                if (item.isDirectory()) {
                    if (state.operationDest.includes(item["path"])) {
                        dispatch({
                            type: "TOAST",
                            payload: "Skipping Source Folder"
                        })
                    } else {
                        const collectFromDir = async (checkItem) => {
                            let dirContents = await RNFS.readDir(checkItem["path"])
                            for (const dirItem of dirContents) {
                                if (dirItem.isDirectory()) {
                                    await collectFromDir(dirItem)
                                } else {
                                    collectedItems.push(dirItem)
                                }
                            }
                        }
                        await collectFromDir(item)
                    }
                } else {
                    collectedItems.push(item)
                }
            }
        }
        await collectFilesFromFolder()
        const totalFiles = collectedItems.length
        let totalSize = 0
        collectedItems.forEach(item => {
            totalSize = totalSize + item["size"]
        })
        //return (collectedItems, totalFiles, totalSize)

        setProgressModal(1)
        let transferredSize = 0
        for (const item of collectedItems) {
            if (breakOperation == 1) { break }
            else {
                setProgress((transferredSize / totalSize) * 100)
                let dest = state.operationDest + "/" + item["name"]

                if (await RNFS.exists(dest)) {

                    nameNewItem.current = item["name"] //to show item name on decision,rename modal
                    setItemExistsModal(1)

                    const decision = await new Promise((resolve) => {
                        decisionRef.current = { resolve }
                    })

                    switch (decision) {
                        case 0: { //skip
                            transferredSize = transferredSize + item["size"]
                            dispatch({
                                type: "TOAST",
                                payload: "Skipped"
                            })
                            break
                        }
                        case 1: { //overwrite
                            myInterval = setInterval(async () => {
                                let size = await RNFS.stat(dest)
                                setProgress(((transferredSize + size["size"]) / totalSize) * 100)
                            }, 2000);

                            if (state.operationType == 0)
                                await copyHandler(item["path"], dest)
                            else
                                await moveHandler(item["path"], dest)

                            transferredSize = transferredSize + item["size"]
                            break
                        }
                        case 2: { //rename
                            dest = state.operationDest + "/" + nameNewItem.current

                            myInterval = setInterval(async () => {
                                let size = await RNFS.stat(dest)
                                setProgress(((transferredSize + size["size"]) / totalSize) * 100)
                            }, 2000);

                            if (state.operationType == 0)
                                await copyHandler(item["path"], dest)
                            else
                                await moveHandler(item["path"], dest)

                            transferredSize = transferredSize + item["size"]
                        }
                    }
                } else { //if not exists
                    myInterval = setInterval(async () => {
                        let size = await RNFS.stat(dest)
                        setProgress(((transferredSize + size["size"]) / totalSize) * 100)
                    }, 2000);

                    if (state.operationType == 0)
                        await copyHandler(item["path"], dest)
                    else
                        await moveHandler(item["path"], dest)

                    transferredSize = transferredSize + item["size"]

                }
                clearInterval(myInterval);
            }
        }
        let messageType = state.operationType == 1 ? "Move" : "Copy"

        if (state.operationType == 1) {//if move, reload both source and dest
            let srcPath = state.clipboardItems[0]["path"].split("/")
            srcPath.pop()
            srcPath = srcPath.join("/")

            let srcListing
            try {
                srcListing = await RNFS.readDir(srcPath)
            } catch (e) {
                console.log(e)
                dispatch({
                    type: "TOAST",
                    payload: "Error loading folder"
                })
                srcListing = []
            }

            let destListing
            try {
                destListing = await RNFS.readDir(state.operationDest)
            } catch (e) {
                console.log(e)
                dispatch({
                    type: "TOAST",
                    payload: "Error loading folder"
                })
                destListing = []
            }

            setMainCache({
                ...mainCache,
                [srcPath]: srcListing,
                [state.operationDest]: destListing
            })

        } else { //else only dest
            await buildCache(state.operationDest)
        }

        if (breakOperation == 1) {
            dispatch({
                type: "TOAST",
                payload: messageType + " cancelled."
            })
        } else {
            let message = messageType + " successful."
            if (failedItems.current.length)
                message = failedItems.current.length + "failed to " + messageType
            dispatch({
                type: "TOAST",
                payload: message
            })
        }

        //reset values
        nameNewItem.current = ""
        setProgress(0)
        setProgressModal(0)
        failedItems.current = []
        dispatch({
            type: "OPERATIONTYPE",
            payload: -1,
        })
        setBreakOperation(0)
    }

    const copyHandler = async (item, dest) => {
        try {
            await RNFS.copyFile(item, dest)
        } catch (error) {
            console.log(error)
            dispatch({
                type: "TOAST",
                payload: "Error occured. Check logs."
            })
            failedItems.current.push(item)
        }
    }

    const moveHandler = async (item, dest) => {
        try {
            await RNFS.moveFile(item, dest)
        } catch (error) {
            console.log(error)
            dispatch({
                type: "TOAST",
                payload: "Error occured. Check logs."
            })
            failedItems.current.push(item)
        }
    }

    const deleteHandler = async () => {
        setDeleteModal(1)
        const decision = await new Promise((resolve) => {
            deleteRef.current = { resolve }
        })
        if (decision) {
            setProgress(0)
            setProgressModal(1)
            for (let i = 0; i < state.clipboardItems.length; i++) {
                if (breakOperation == 1) {
                    break
                } else {
                    let item = state.clipboardItems[i]
                    try {
                        await RNFS.unlink(item["path"])
                    } catch (err) {
                        console.log(err)
                        failedItems.current.push(item)
                    }
                    setProgress(((i + 1) / state.clipboardItems.length) * 100)
                }
            }

            setProgressModal(0)
            setProgress(0)
            if (breakOperation == 1) {
                dispatch({
                    type: "TOAST",
                    payload: "Deletion cancelled."
                })
            } else {
                let message = "Item(s) deleted."
                if (failedItems.current.length)
                    message = failedItems.current.length + "item(s) failed to delete"
                dispatch({
                    type: "TOAST",
                    payload: message
                })
            }

            failedItems.current = []
            state.clipboardItems = []
            await buildCache(state.operationDest)
            setDeleteModal(0)
            setBreakOperation(0)
        }
    }

    const renameHandler = async (item) => {
        setInputModal("Rename")
        const value = await new Promise((resolve) => {
            inputRef.current = { resolve }
        })
        setInputModal(0)
        await moveHandler(item["path"], state.operationDest + "/" + value)
        await buildCache(state.operationDest)
    }

    const zipHandler = async () => {
        setInputModal("Zip")
        const value = await new Promise((resolve) => {
            inputRef.current = { resolve }
        })
        setInputModal(0)
        setProgressModal(1)
        try {
            const filesToZip = []
            for (let i = 0; i < state.clipboardItems.length; i++) {
                filesToZip.push(state.clipboardItems[i]["path"]
                )
            }

            // Zip files

            await zip(filesToZip, state.operationDest + "/" + value + ".zip");
            ToastAndroid.showWithGravity(
                "Zip created Successfully.",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        } catch (error) {
            console.log(error)
            ToastAndroid.showWithGravity(
                "Error Zipping Files",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
    }

    const Icon = (item) => {
        let ext = ""
        if (item.isFile()) {
            ext = item.name.split(".").pop()
        } else {
            return <Image
                style={[styles.imageIcon]}
                source={require('./assets/folder.png')} />
        }
        switch (ext) {
            case "mp3":
                return (<Image
                    style={[styles.imageIcon]}
                    source={require('./assets/music.png')} />)
            case "exe":
                return (<Image
                    style={[styles.imageIcon]}
                    source={require('./assets/win.png')} />)
            default:
                return (<Text style={[styles.text,
                styles.smallDarkText]}>{ext}</Text>)
        }
    }

    return (
        <CombinedReducersContext.Provider value={state}>
            <CombinedDispatchContext.Provider value={dispatch}>
                <View style={[styles.mainBody]}>
                    {/* <Pressable onPressIn={() => console.log(nameNewItem)}><Text>Show progress</Text></Pressable> */}
                    {
                        aboutModal || favouritesModal || clipBoardModal || progressModal || inputModal || deleteModal || itemExistsModal ?
                            <Modals
                                inputRef={inputRef}
                                decisionRef={decisionRef}
                                inputModal={inputModal}
                                alreadyExists={alreadyExists}
                                deleteRef={deleteRef}
                                nameNewItem={nameNewItem}
                                favouriteItems={favouriteItems}
                                clipBoardModal={clipBoardModal}
                                itemExistsModal={itemExistsModal}
                                aboutModal={aboutModal}
                                deleteModal={deleteModal}
                                favouritesModal={favouritesModal}
                                showToast={showToast}
                                setAlreadyExists={setAlreadyExists}
                                setClipBoardModal={setClipBoardModal}
                                setShowPaste={setShowPaste}
                                Icon={Icon}
                                setForceRefresh={setForceRefresh}
                                setItemExistsModal={setItemExistsModal}
                                setInputModal={setInputModal}
                                setDeleteModal={setDeleteModal}
                                setFavouritesModal={setFavouritesModal}
                                setFavouriteItems={setFavouriteItems}
                                setAboutModal={setAboutModal}
                                setProgressModal={setProgressModal}
                            />
                            : null}
                    <MediaWindow
                        mediaType={mediaType}
                        height={height}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        setMediaBox={setMediaBox}
                        setMediaType={setMediaType}
                    />
                    <View
                        style={
                            {
                                flex: 1
                            }
                        }
                    >
                        {
                            Object.keys(state.tabs).map((index) =>

                                <Window
                                    key={index}
                                    index={index}
                                    progressModal={progressModal}
                                    breadCrumbsTabName={breadCrumbsTabName}
                                    Icon={Icon}
                                    openExternally={openExternally}
                                    selectItem={selectItem}
                                    setMediaBox={setMediaBox}
                                    setMediaType={setMediaType}
                                    fileHandler={fileHandler}
                                    StageItems={StageItems}
                                    newItem={newItem}
                                    setClipBoardModal={setClipBoardModal}
                                    setFavouritesModal={setFavouritesModal}
                                // ref={(ref) => {
                                //     windowRefs.current[i] = ref
                                // }
                                // }
                                />
                            )
                        }
                    </View>
                    <ToolBar
                        contextMenu={contextMenu}
                        newItem={newItem}
                        setContextMenu={setContextMenu}
                        setFavouritesModal={setFavouritesModal}
                        setClipBoardModal={setClipBoardModal}
                        setAboutModal={setAboutModal}
                    />
                    <Tabbar
                        currTabStatic={currTabStatic}
                        showPaste={showPaste}
                        width={width}
                        startShifting={startShifting}
                    />
                </View>
                <Pressable onPress={() => console.log(state)}><Text>SHow all</Text></Pressable>
            </CombinedDispatchContext.Provider>
        </CombinedReducersContext.Provider>
    );
};
export default App