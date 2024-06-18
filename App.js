import { useEffect, useRef, useState } from "react";
import { Text, View, Dimensions, Image, ToastAndroid } from "react-native";
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

const showToast = (message) => {
    ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
    )
}
const App = () => {
    console.log("app render")
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
        addNewTab(null, null, null)
    }, [])
    useEffect(() => {
        setMainCache({ "Home": favPaths })
    }, [favPaths])
    const [mainCache, setMainCache] = useState({})

    // const windowRefs = useRef([])

    const [currTab, setCurrTab] = useState("0") //to automatically change window display flex
    const currTabStatic = useRef("0") //to set tab path with latest currtab value

    const [tabs, setTabs] = useState({})
    const [tabCounter, setTabCounter] = useState(0)

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

    const clipboardItems = useRef([])
    const operationSource = useRef("")
    const operationDest = useRef("")
    const operationType = useRef(-1)
    const [funcId, setFuncId] = useState(-1)
    const failedItems = useRef([])
    const [selectedItem, setSelectedItem] = useState([]) //for media
    const decisionRef = useRef("")

    const [mediaType, setMediaType] = useState(0)
    const [mediaBox, setMediaBox] = useState(0)

    const nameNewItem = useRef("")


    let width = Dimensions.get('window').width

    useEffect(() => {
        console.log(currTab)
    }, [currTab])

    const addNewTab = (title, path, type) => {
        if (title == null) {
            if (Object.keys(tabs).length == 0) {
                setTabs(
                    {
                        0: {
                            title: "Home",
                            path: "Home",
                            type: "filebrowser",
                        }
                    }
                )
            }
            else {
                setTabs({
                    ...tabs,
                    [tabCounter]: {
                        title: tabs[currTab]["title"],
                        path: tabs[currTab]["path"],
                        type: "filebrowser",
                    }
                })
                currTabStatic.current = tabCounter.toString()
                setCurrTab(currTabStatic.current)
            }
        }
        else {
            setTabs({
                ...tabs,
                [tabCounter]: {
                    title: title,
                    path: path,
                    type: type,
                }
            })
            currTabStatic.current = tabCounter.toString()
            setCurrTab(currTabStatic.current)
        }
        setTabCounter(tabCounter + 1)
    }
    const deleteAllTabs = () => {
        setTabs(
            {
                0: {
                    title: "Home",
                    path: "Home",
                    type: "filebrowser",
                }
            }
        )
        currTabStatic.current = 0
        setTabCounter(currTabStatic.current)
        setCurrTab(currTabStatic.current)
    }

    const deleteCurrTab = () => {
        if (Object.keys(tabs).length == 1)
            deleteAllTabs()
        else
            deleteTab()
    }
    const deleteOtherTabs = () => {
        setTabs(
            {
                [currTabStatic.current]: tabs[currTab]
            }
        )
    }
    const deleteTab = () => {
        const fire = () => {
            let tempTabs = { ...tabs }
            delete tempTabs[currTabStatic.current]
            setTabs(tempTabs)
        }

        let keys = Object.keys(tabs)
        let indxCurrTab = keys.indexOf(currTabStatic.current)
        if (keys[keys.length - 1] == currTabStatic.current) { //last
            console.log("last", keys, indxCurrTab, currTabStatic.current, indxCurrTab in keys)
            fire()
            currTabStatic.current = keys[indxCurrTab - 1].toString()
            setCurrTab(currTabStatic.current)
        }
        else {//mid
            fire()
            currTabStatic.current = keys[indxCurrTab + 1].toString()
            setCurrTab(currTabStatic.current)
        }
    }

    const setTabPath = (path) => {
        const updateTabDetails = () => {
            setTabs(tabs => ({
                ...tabs,
                [currTabStatic.current]: {
                    ...tabs[currTabStatic.current],
                    title: folderName,
                    path: path
                }
            }
            ))
        }

        let folderName
        if (path == null) { //go up
            path = tabs[currTabStatic.current]["path"]
            if (favPaths.find((i) => i.path == path)) {
                path = "Home"
                folderName = "Home"
                updateTabDetails()
                return 1
            } else {
                path = path.split("/")
                folderName = path.pop()
            }
        } else { //go inside
            checkFavPath = favPaths.find((i) => i.path == path)
            path = path.split("/")
            if (checkFavPath) {
                folderName = checkFavPath["name"]
            } else {
                folderName = [...path].pop()
            }
        }
        path = path.join("/")
        updateTabDetails()
    }

    const buildCache = async (path) => {
        let dirListing
        try {
            dirListing = await RNFS.readDir(path)
        } catch (e) {
            console.log(e)
            showToast("Error loading folder")
            dirListing = []
        }
        setMainCache({
            ...mainCache,
            [path]: dirListing
        })
        console.log("build cache")
        return 1
    }

    const breadCrumbsTabName = () => {
        let path = tabs[currTab]["path"]

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
        let path = tabs[currTab]["path"]
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

    const readySet = (type, selectedItems) => { //from source tab
        setFuncId(-1)
        clipboardItems.current = selectedItems
        if (type in [0, 1]) {
            operationType.current = type
            operationSource.current = tabs[currTab]["path"]
            setShowPaste(1)
            ToastAndroid.showWithGravity(
                clipboardItems.current.length + " items " + (type ? "ready to move" : "copied"),
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
        if (type == 2) {
            operationType.current = 2
            operationDest.current = tabs[currTab]["path"]
            deleteHandler()
        }
        if (type == 3) {
            setShowPaste(0)
            operationType.current = 1 //rename is moveItem
            operationDest.current = tabs[currTab]["path"]
            nameNewItem.current = clipboardItems.current["name"]
            renameHandler(clipboardItems.current)
        }
        if (type == 4) {
            operationType.current = 4
            operationDest.current = tabs[currTab]["path"]
            zipHandler()
        }
    }

    const startShifting = async () => {
        setShowPaste(0)
        operationDest.current = tabs[currTab]["path"]
        let collectedItems = []
        const collectFilesFromFolder = async () => {
            for (let i = 0; i < clipboardItems.current.length; i++) {
                let item = clipboardItems.current[i]
                if (item.isDirectory()) {
                    if (operationDest.current.includes(item["path"])) {
                        showToast("Skipping Source Folder")
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
                let dest = operationDest.current + "/" + item["name"]

                if (await RNFS.exists(dest)) {

                    nameNewItem.current = item["name"] //to show item name on decision,rename modal
                    setItemExistsModal(1)

                    const decision = await new Promise((resolve) => {
                        decisionRef.current = { resolve }
                    })

                    switch (decision) {
                        case 0: { //skip
                            transferredSize = transferredSize + item["size"]
                            showToast("Skipped")
                            break
                        }
                        case 1: { //overwrite
                            myInterval = setInterval(async () => {
                                let size = await RNFS.stat(dest)
                                setProgress(((transferredSize + size["size"]) / totalSize) * 100)
                            }, 2000);

                            if (operationType.current == 0)
                                await copyHandler(item["path"], dest)
                            else
                                await moveHandler(item["path"], dest)

                            transferredSize = transferredSize + item["size"]
                            break
                        }
                        case 2: { //rename
                            dest = operationDest.current + "/" + nameNewItem.current

                            myInterval = setInterval(async () => {
                                let size = await RNFS.stat(dest)
                                setProgress(((transferredSize + size["size"]) / totalSize) * 100)
                            }, 2000);

                            if (operationType.current == 0)
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

                    if (operationType.current == 0)
                        await copyHandler(item["path"], dest)
                    else
                        await moveHandler(item["path"], dest)

                    transferredSize = transferredSize + item["size"]

                }
                clearInterval(myInterval);
            }
        }
        let messageType = operationType.current == 1 ? "Move" : "Copy"

        if (operationType.current == 1) {//if move, reload both source and dest
            let srcPath = clipboardItems.current[0]["path"].split("/")
            srcPath.pop()
            srcPath = srcPath.join("/")

            let srcListing
            try {
                srcListing = await RNFS.readDir(srcPath)
            } catch (e) {
                console.log(e)
                showToast("Error loading folder")
                srcListing = []
            }

            let destListing
            try {
                destListing = await RNFS.readDir(operationDest.current)
            } catch (e) {
                console.log(e)
                showToast("Error loading folder")
                destListing = []
            }

            setMainCache({
                ...mainCache,
                [srcPath]: srcListing,
                [operationDest.current]: destListing
            })

        } else { //else only dest
            await buildCache(operationDest.current)
        }

        if (breakOperation == 1) {
            showToast(messageType + " cancelled.")
        } else {
            let message = messageType + " successful."
            if (failedItems.current.length)
                message = failedItems.current.length + "failed to " + messageType
            showToast(message)
        }

        //reset values
        nameNewItem.current = ""
        setProgress(0)
        setProgressModal(0)
        failedItems.current = []
        operationType.current = -1
        setBreakOperation(0)
    }

    const copyHandler = async (item, dest) => {
        try {
            await RNFS.copyFile(item, dest)
        } catch (error) {
            console.log(error)
            showToast("Error occured. Check logs.")
            failedItems.current.push(item)
        }
    }

    const moveHandler = async (item, dest) => {
        try {
            await RNFS.moveFile(item, dest)
        } catch (error) {
            console.log(error)
            showToast("Error occured. Check logs.")
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
            for (let i = 0; i < clipboardItems.current.length; i++) {
                if (breakOperation == 1) {
                    break
                } else {
                    let item = clipboardItems.current[i]
                    try {
                        await RNFS.unlink(item["path"])
                    } catch (err) {
                        console.log(err)
                        failedItems.current.push(item)
                    }
                    setProgress(((i + 1) / clipboardItems.current.length) * 100)
                }
            }

            setProgressModal(0)
            setProgress(0)
            if (breakOperation == 1) {
                showToast("Deletion cancelled.")
            } else {
                let message = "Item(s) deleted."
                if (failedItems.current.length)
                    message = failedItems.current.length + "item(s) failed to delete"
                showToast(message)
            }

            failedItems.current = []
            clipboardItems.current = []
            await buildCache(operationDest.current)
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
        await moveHandler(item["path"], operationDest.current + "/" + value)
        await buildCache(operationDest.current)
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
            for (let i = 0; i < clipboardItems.current.length; i++) {
                filesToZip.push(clipboardItems.current[i]["path"]
                )
            }

            // Zip files

            await zip(filesToZip, operationDest.current + "/" + value + ".zip");
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
        <View style={[styles.mainBody]}>
            {/* <Pressable onPressIn={() => console.log(nameNewItem)}><Text>Show progress</Text></Pressable> */}
            {
                aboutModal || favouritesModal || clipBoardModal || progressModal || inputModal || deleteModal || itemExistsModal ?
                    <Modals
                        clipboardItems={clipboardItems}
                        inputRef={inputRef}
                        decisionRef={decisionRef}
                        inputModal={inputModal}
                        alreadyExists={alreadyExists}
                        deleteRef={deleteRef}
                        nameNewItem={nameNewItem}
                        path={tabs[currTab]["path"]}
                        cache={mainCache[tabs[currTab]["path"]]}
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
                        setTabPath={setTabPath}
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
                    Object.keys(tabs).map((index) =>

                        <Window
                            key={index}
                            buildCache={buildCache}
                            breadCrumbsTabName={breadCrumbsTabName}
                            index={index}
                            Icon={Icon}
                            currTab={currTab}
                            tabData={tabs[index]}
                            setTabPath={setTabPath}
                            deleteAllTabs={deleteAllTabs}
                            deleteCurrTab={deleteCurrTab}
                            deleteOtherTabs={deleteOtherTabs}
                            addNewTab={addNewTab}
                            filesList={mainCache[tabs[index]["path"]]}
                            openExternally={openExternally}
                            selectItem={selectItem}
                            setMediaBox={setMediaBox}
                            setMediaType={setMediaType}
                            fileHandler={fileHandler}
                            readySet={readySet}
                            newItem={newItem}
                            setClipBoardModal={setClipBoardModal}
                            setFavouritesModal={setFavouritesModal}
                            progressModal={progressModal}
                            funcId={funcId}
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
                setFuncId={setFuncId}
                newItem={newItem}
                setContextMenu={setContextMenu}
                setFavouritesModal={setFavouritesModal}
                deleteAllTabs={deleteAllTabs}
                deleteCurrTab={deleteCurrTab}
                deleteOtherTabs={deleteOtherTabs}
                buildCache={buildCache}
                setClipBoardModal={setClipBoardModal}
                setAboutModal={setAboutModal}
            />
            <Tabbar
                tabs={tabs}
                currTab={currTab}
                setCurrTab={setCurrTab}
                currTabStatic={currTabStatic}
                showPaste={showPaste}
                width={width}
                deleteCurrTab={deleteCurrTab}
                startShifting={startShifting}
                addNewTab={addNewTab}
            />
        </View>
    );
};
export default App