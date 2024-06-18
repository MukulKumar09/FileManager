import { useEffect, useReducer, useRef, useState } from "react";
import { Text, Pressable, View, ScrollView, Dimensions, Image, ToastAndroid, Modal, TextInput, ActivityIndicator, Linking } from "react-native";
import RNFS from 'react-native-fs';
import Animated, { Easing, ReduceMotion, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import FileViewer from "react-native-file-viewer";
import { zip } from 'react-native-zip-archive'
import TabButton from "./TabButton";
import Window from "./Window";
import MediaViewer from "./MediaViewer";
import styles, { backgroundColor, secondaryColor } from "./styles";

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
    const [aboutModal, setAboutModal] = useState(0)
    const [favouritesModal, setFavouritesModal] = useState(0)
    const [clipBoardModal, setClipBoardModal] = useState(0)
    const [progressModal, setProgressModal] = useState(0)
    const [inputModal, setInputModal] = useState(0)
    const [deleteModal, setDeleteModal] = useState(0)
    const [existsModal, setExistsModal] = useState(0)
    const [contextMenu, setContextMenu] = useState(0)

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
                    setExistsModal(1)

                    const decision = await new Promise((resolve) => {
                        decisionRef.current = { resolve }
                    })

                    switch (decision) {
                        case 0: { //skip
                            transferredSize = transferredSize + item["size"]
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
            {
                progressModal == 1 &&
                (<View style={[
                    styles.pill,
                    styles.paddingCloseBottom,
                    {
                        position: 'absolute',
                        zIndex: 2,
                        top: 0,
                        left: 0,
                        right: 0,
                        alignItems: 'flex-start',
                        overflow: 'hidden'
                    }
                ]}>
                    <Animated.View style={[
                        styles.pillHighlight,
                        {
                            height: '100%',
                            position: 'absolute',
                        },
                        animatedWidthStyle
                    ]}>
                    </Animated.View>
                    <View
                        style={[
                            styles.rowLayout,
                            , {
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                justifyContent: 'space-between'
                            }]}
                    >
                        <View style={[
                            styles.rowLayout,
                            styles.mediumGap,
                            styles.wide,
                        ]}>
                            <ActivityIndicator />
                            <Text

                                style={[
                                    styles.text,
                                    styles.smallText
                                ]}>
                                {operationType.current == 0 && "Copy "}
                                {operationType.current == 1 && "Move "}
                                {operationType.current == 2 && "Delete "}
                                {operationType.current == 3 && "Zipping "}
                                in progress   ({progress}%)
                            </Text>
                        </View>
                        <Text style={[
                            styles.text,
                            styles.smallText,
                            {
                                textDecorationLine: 'underline'
                            }
                        ]} onPress={() => deselectAll()}>Cancel</Text>
                    </View>
                </View>
                )
            }
            {clipBoardModal ?
                <Modal
                    transparent={true}>
                    <Pressable
                        onPressIn={() => setClipBoardModal(0)}
                        style={[styles.modalBackground]}
                    />
                    <View style={[
                        styles.pill,
                        styles.modal,
                        styles.bigGap,
                        styles.padding,
                        {
                            backgroundColor: backgroundColor,
                            position: 'absolute',
                            left: 10,
                            right: 10,
                            bottom: 10,
                        }
                    ]}>
                        <View style={[
                            styles.rowLayout,
                            , {
                                width: '100%',
                                justifyContent: 'space-between'
                            }]}>
                            <View style={[styles.rowLayout, styles.bigGap]}>
                                <Image
                                    style={[styles.imageIcon]}
                                    source={require('./assets/archive.png')} />
                                <Text style={[
                                    styles.text,
                                    styles.headingText
                                ]}>Clipboard</Text>
                            </View>
                            <Text style={[
                                styles.text,
                                styles.textDisabled,
                                {
                                    textDecorationLine: 'underline'
                                }
                            ]} onPress={() => {
                                clipboardItems.current = []
                                setShowPaste(0)
                            }}>Clear</Text>
                        </View>
                        <View style={[styles.divider]} />

                        <View style={[
                            {
                                flexDirection: 'column',
                                width: '100%',
                            }
                        ]}>
                            {clipboardItems.current.length == 0 ?
                                <Text style={[styles.text]}>No items</Text>
                                : clipboardItems.current.map(
                                    (item, i) =>
                                        <View
                                            key={i}
                                            style={[
                                                styles.rowLayout,
                                            ]}>
                                            <Pressable
                                                style={[
                                                    styles.rowLayout,
                                                    styles.bigGap,
                                                    styles.wide,
                                                    {
                                                        paddingVertical: 10
                                                    }]}
                                            >
                                                {Icon(item)}
                                                <Text style={[styles.text]}>{item["name"]}</Text>
                                            </Pressable>
                                            <Pressable
                                                onPressIn={() => {
                                                    clipboardItems.current.splice(i, 1)
                                                    setForceRefresh(!forceRefresh)
                                                }}
                                            >
                                                <Image
                                                    style={[styles.imageIcon]}
                                                    source={require('./assets/close.png')} />
                                            </Pressable>
                                        </View>
                                )}
                        </View>
                        <View style={[styles.divider]} />
                        <Pressable
                            style={[
                                styles.pill,
                                styles.centered,
                                styles.padding
                                , {
                                    width: '100%'
                                }]}
                            onPressIn={() => setClipBoardModal(0)}
                        >
                            <Text style={[styles.text]}>Close</Text>
                        </Pressable>
                    </View>
                </Modal>
                : null
            }
            {existsModal ?
                <Modal
                    transparent={true}
                >
                    <Pressable
                        onPressIn={() => {
                            decisionRef.current.resolve(1);
                            setExistsModal(0)
                        }}
                        style={[styles.modalBackground]}
                    />
                    <View style={[
                        styles.pill,
                        styles.modal,
                        styles.padding,
                        {
                            backgroundColor: backgroundColor,
                            position: 'absolute',
                            left: 10,
                            right: 10,
                            bottom: 10,
                        }
                    ]}>
                        <Text style={[styles.text,
                        styles.headingText]}>Item Exists!</Text>
                        <View style={[styles.divider]} />
                        <Text style={[styles.text]}>{nameNewItem.current} already exists in destination</Text>
                        <View style={[styles.mediumGap, { flexDirection: 'column', marginTop: 30, width: '100%' }]}>
                            <Pressable
                                style={[styles.pill,
                                styles.centered,
                                styles.pillHighlight,
                                styles.padding]}
                                onPressIn={async () => {
                                    setInputModal("Rename")
                                    await new Promise((resolve) => {
                                        inputRef.current = { resolve }
                                    })
                                    console.log("rename promised")
                                    decisionRef.current.resolve(2);
                                    setExistsModal(0)
                                    setInputModal(0)
                                }
                                }
                            >
                                <Text style={[styles.text]}>Rename</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.pill,
                                styles.centered,
                                styles.padding]}
                                onPressIn={() => {
                                    decisionRef.current.resolve(0);
                                    setExistsModal(0)
                                }
                                }
                            >
                                <Text style={[styles.text]}>Skip</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.pill,
                                styles.centered,
                                styles.padding]}
                                onPressIn={() => {
                                    decisionRef.current.resolve(1);
                                    setExistsModal(0)
                                }}
                            >
                                <Text style={[styles.text]}>Overwrite</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                : null
            }
            {aboutModal ?
                <Modal
                    transparent={true}
                >
                    <Pressable
                        onPressIn={() => setAboutModal(0)}
                        style={[styles.modalBackground]}
                    />

                    <View style={[
                        styles.pill,
                        styles.modal,
                        styles.bigGap,
                        styles.padding,
                        {
                            backgroundColor: backgroundColor,
                            position: 'absolute',
                            left: 10,
                            right: 10,
                            bottom: 10,
                        }
                    ]}>
                        <View style={[styles.rowLayout, styles.bigGap]}>
                            <Image
                                style={[styles.imageIcon]}
                                source={require('./assets/about.png')} />
                            <Text style={[
                                styles.text,
                                styles.headingText
                            ]}>About</Text>
                        </View>
                        <View style={[styles.divider]} />
                        <View style={[styles.rowLayout, styles.bigGap, { alignItems: 'flex-start' }]}>
                            <Image source={{ uri: 'https://github.com/MukulKumar09.png' }}
                                style={{
                                    height: 100,
                                    width: 100,
                                    borderRadius: 30
                                }} />
                            <View style={[styles.wide]}>
                                <Text style={[styles.text]}>Author: Mukul Kumar{"\n"}</Text>
                                <Pressable
                                    onPressIn={() => Linking.openURL('https://github.com/MukulKumar09')}
                                    style={[
                                        styles.smallPill
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.smallText,
                                            styles.text,
                                            styles.textDisabled
                                        ]}>
                                        https://github.com/MukulKumar09
                                    </Text>
                                </Pressable>
                            </View>
                        </View>

                        <Text style={[styles.text, styles.smallText]}>
                            {"\n"}
                            Thanks for downloading my app!
                            {"\n"}
                            You can support this independent project by rating and leaving a feedback on Play Store.
                            {"\n"}
                        </Text>
                        <View
                            style={[
                                styles.rowLayout,
                                styles.mediumGap,
                                styles.wide
                            ]}
                        >
                            <Pressable
                                onPressIn={() => {
                                    setAboutModal(0)
                                }
                                }
                                style={[
                                    styles.pill,
                                    styles.centered,
                                    styles.wide,
                                    styles.padding
                                ]}>
                                <Text style={[styles.text]}>Close</Text>
                            </Pressable>
                            <Pressable
                                onPressIn={() => {
                                    setAboutModal(0)
                                }
                                }
                                style={[
                                    styles.pill,
                                    styles.pillHighlight,
                                    styles.centered,
                                    styles.wide,
                                    styles.padding
                                ]}>
                                <Text style={[styles.text]}>⭐  Rate</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                : null}
            {inputModal ?
                <Modal
                    transparent={true}
                    onShow={() => {
                        this.textInput.blur();
                        this.textInput.focus();
                    }}
                >
                    <Pressable
                        onPressIn={() => setInputModal(0)}
                        style={[styles.modalBackground]}
                    />

                    <View style={[
                        styles.pill,
                        styles.modal,
                        styles.bigGap,
                        styles.padding,
                        {
                            backgroundColor: backgroundColor,
                            position: 'absolute',
                            left: 10,
                            right: 10,
                            bottom: 10,
                        }
                    ]}>
                        <Text style={[styles.text,
                        styles.headingText]}>
                            New {inputModal}
                        </Text>
                        <View style={[styles.divider]} />
                        {alreadyExists ? <Text style={[styles.text,
                        styles.smallText]}>Already exists!</Text> : null}
                        <View style={[styles.rowLayout,
                        styles.pill,
                        styles.input]}>
                            <TextInput
                                ref={input => { this.textInput = input; }}
                                autoFocus={true}
                                style={[styles.text,
                                styles.wide]}
                                multiline={true}
                                defaultValue={nameNewItem.current}
                                onChangeText={text => {
                                    for (let i = 0; i < mainCache[tabs[currTab]["path"]].length; i++) {
                                        if (mainCache[tabs[currTab]["path"]][i]["name"] == text) {
                                            setAlreadyExists(1)
                                            break
                                        } else {
                                            setAlreadyExists(0)
                                            nameNewItem.current = text
                                        }
                                    }
                                }
                                }
                            />
                        </View>
                        <View style={[styles.rowLayout,
                        styles.bigGap]}>
                            <Pressable
                                onPressIn={() => {
                                    nameNewItem.current = ""
                                    setInputModal(0)
                                }
                                }
                                style={[
                                    styles.pill,
                                    styles.wide,
                                    styles.centered,
                                    styles.padding]}>
                                <Text style={[styles.text]}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                disabled={alreadyExists ? true : false}
                                onPressIn={() => {
                                    inputRef.current.resolve(nameNewItem.current)
                                }
                                }
                                style={[styles.pill,
                                styles.centered,
                                styles.pillHighlight,
                                styles.wide,
                                styles.padding]}>
                                <Text style={[styles.text, alreadyExists ? styles.textDisabled : null]}>Done</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                : null
            }
            {deleteModal ? <Modal
                transparent={true}
            >
                <Pressable
                    onPressIn={() => setDeleteModal(0)} style={[styles.modalBackground]}
                />

                <View style={[
                    styles.pill,
                    styles.modal,
                    styles.padding,
                    {
                        backgroundColor: backgroundColor,
                        position: 'absolute',
                        left: 10,
                        right: 10,
                        bottom: 10,
                    }
                ]}>
                    <View style={[styles.rowLayout, styles.bigGap]}>
                        <Image
                            style={[styles.imageIcon]}
                            source={require('./assets/delete.png')} />
                        <Text style={[
                            styles.text,
                            styles.headingText
                        ]}>Delete Item(s)?</Text>
                    </View>
                    <View style={[styles.divider]} />
                    <Text style={[styles.text,
                    styles.textDisabled]}>Following items will be deleted:</Text>
                    <View style={{ flexDirection: 'column', marginBottom: 20 }}>
                        {clipboardItems.current.map((item, i) =>
                            <Text key={i} style={[styles.text,
                            styles.smallText]}>{item["name"]}</Text>
                        )}
                    </View>
                    <View style={[styles.rowLayout,
                    styles.bigGap]}>
                        <Pressable
                            onPressIn={() => {
                                deleteRef.current.resolve(0)
                                setDeleteModal(0)
                            }
                            }
                            style={[styles.pill,
                            styles.centered,
                            styles.wide,
                            styles.padding]}>
                            <Text style={[styles.text]}>Cancel</Text>
                        </Pressable>
                        <Pressable
                            disabled={alreadyExists ? true : false}
                            onPressIn={() => {
                                deleteRef.current.resolve(1)
                            }
                            }
                            style={[styles.pill,
                            styles.centered,
                            styles.pillHighlight,
                            styles.wide,
                            styles.padding]}>
                            <Text style={[styles.text, alreadyExists ? styles.textDisabled : null]}>Delete</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
                : null
            }
            {favouritesModal ?
                <Modal
                    transparent={true}>
                    <Pressable
                        onPressIn={() => setFavouritesModal(0)}
                        style={[styles.modalBackground]}
                    />
                    <View style={[
                        styles.pill,
                        styles.modal,
                        styles.bigGap,
                        styles.padding,
                        {
                            backgroundColor: backgroundColor,
                            position: 'absolute',
                            left: 10,
                            right: 10,
                            bottom: 10,
                        }
                    ]}>
                        <View style={[
                            styles.rowLayout,
                            , {
                                width: '100%',
                                justifyContent: 'space-between'
                            }]}>
                            <View style={[styles.rowLayout, styles.bigGap]}>
                                <Image
                                    style={[styles.imageIcon]}
                                    source={require('./assets/favourite.png')} />
                                <Text style={[
                                    styles.text,
                                    styles.headingText
                                ]}>Favourites</Text>
                            </View>
                            <Text style={[
                                styles.text,
                                styles.textDisabled,
                                {
                                    textDecorationLine: 'underline'
                                }
                            ]} onPress={() =>
                                setFavouriteItems([])
                            }>Clear</Text>
                        </View>
                        <View style={[styles.divider]} />
                        <View style={[
                            {
                                flexDirection: 'column',
                                width: '100%',
                            }
                        ]}>
                            {Object.keys(favouriteItems).length == 0 ?
                                <Text style={[styles.text]}>No items</Text>
                                : favouriteItems.map(
                                    (item, i) =>
                                        <View
                                            key={i}
                                            style={[
                                                styles.rowLayout,
                                            ]}>
                                            <Pressable
                                                style={[
                                                    styles.rowLayout,
                                                    styles.bigGap,
                                                    styles.wide,
                                                    {
                                                        paddingVertical: 20
                                                    }
                                                ]}
                                                onPressIn={() => {
                                                    setTabPath(item["path"])
                                                    setFavouritesModal(0)
                                                }}
                                            >
                                                <Image
                                                    style={[styles.imageIcon]}
                                                    source={require('./assets/folder.png')} />
                                                <Text style={[styles.text]}>{item["title"]}</Text>
                                            </Pressable>
                                            <Pressable
                                                onPressIn={() => {
                                                    let tempFavItems = [...favouriteItems]
                                                    tempFavItems.splice(i, 1)
                                                    setFavouriteItems(tempFavItems)
                                                }}
                                            >
                                                <Image
                                                    style={[styles.imageIcon]}
                                                    source={require('./assets/close.png')} />
                                            </Pressable>
                                        </View>
                                )}
                        </View>

                        <View style={[styles.divider]} />
                        <Pressable
                            style={[
                                styles.rowLayout,
                                styles.pill,
                                styles.bigGap,
                                styles.padding
                                , {
                                    width: '100%'
                                }]}
                            onPressIn={() => {
                                let favPath = tabs[currTab]["path"]
                                let favTitle = favPath.split("/").pop()
                                let newFavItem = {
                                    'title': favTitle,
                                    "path": favPath
                                }
                                if (favouriteItems.find((item) => item.path == favPath) == undefined) {
                                    setFavouriteItems([...favouriteItems, newFavItem])
                                } else {
                                    showToast("Item already exists")
                                }
                            }}
                        ><Image style={[styles.imageIcon]}
                            source={require('./assets/newfolder.png')} />
                            <Text style={[styles.text]}>Add Current Folder</Text>
                        </Pressable>
                    </View>
                </Modal>
                : null
            }
            <Animated.View
                style={{
                    height: height,
                    overflow: 'hidden'
                }}
            >
                {mediaType == 0 ? null :
                    <MediaViewer
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        mediaType={mediaType}
                        setMediaBox={setMediaBox}
                        setMediaType={setMediaType} />
                }
            </Animated.View>
            <View
                style={
                    {
                        flex: 1
                    }
                }
            >
                {
                    // useMemo(() =>
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
                    // , [tabs, mainCache])
                }
            </View>
            {contextMenu ?
                <View style={{
                    position: 'absolute',
                    zIndex: 1,
                    height: '100%',
                    width: '100%',
                }}>
                    <Pressable
                        onPressIn={() => setContextMenu(0)}
                        style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                        }}
                    >
                    </Pressable>

                    <View
                        style={[
                            styles.pill,
                            {
                                position: 'absolute',
                                bottom: 100,
                                right: 10,
                                width: '50%',
                                elevation: 10,
                                shadowColor: 'black',
                            }
                        ]}
                    >
                        <Pressable
                            style={[
                                styles.padding
                            ]}
                            onPress={() => {
                                deleteAllTabs()
                                setContextMenu(0)
                            }}
                        >
                            <Text style={[styles.text]}>Close all tabs</Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.padding
                            ]}
                            onPress={() => {
                                deleteCurrTab()
                                setContextMenu(0)
                            }}
                        >
                            <Text style={[styles.text]}>Close this tab</Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.wide,
                                styles.padding
                            ]}
                            onPress={() => {
                                deleteOtherTabs()
                                setContextMenu(0)
                            }}
                        >
                            <Text style={[styles.text]}>Close other tabs</Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.rowLayout,
                                styles.bigGap,
                                styles.wide,
                                styles.padding
                            ]}
                            onPress={() => {
                                buildCache(tabs[currTab]["path"])
                                setSelectedItems([])
                                setSelectedItem([])
                            }}
                        ><Image
                                style={[styles.imageIcon]}
                                source={require('./assets/refresh.png')} />
                            <Text style={[styles.text]}>Refresh</Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.rowLayout,
                                styles.bigGap,
                                styles.wide,
                                styles.padding
                            ]}
                            onPress={() => { setClipBoardModal(1) }}
                        >
                            <Image
                                style={[styles.imageIcon]}
                                source={require('./assets/archive.png')} />
                            <Text style={[styles.text]}>Clipboard</Text>
                        </Pressable>

                        {/* {selectionFlag ?
                            <View
                                style={[
                                    styles.rowLayout
                                ]}>
                                <Pressable
                                    style={[
                                        styles.rowLayout,
                                        styles.bigGap,
                                        styles.wide,
                                        styles.padding
                                    ]}
                                    onPressIn={() => { readySet(4, selectedItems) }}
                               ><Image source={require('./assets/archive.png')} />
                                    <Text style={[styles.text]}>Archive</Text>
                                </Pressable>
                            </View>
                            : null} */}
                        <Pressable
                            style={[
                                styles.rowLayout,
                                styles.bigGap,
                                styles.wide,
                                styles.padding
                            ]}
                            onPress={() => { setAboutModal(1) }}
                        ><Image
                                style={[styles.imageIcon]}
                                source={require('./assets/about.png')} />
                            <Text style={[styles.text]}>About</Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.rowLayout,
                                styles.bigGap,
                                styles.wide,
                                styles.padding
                            ]}
                            onPress={() => { setContextMenu(0) }}
                        ><Image
                                style={[styles.imageIcon]}
                                source={require('./assets/close.png')} />
                            <Text style={[styles.text]}>Close</Text>
                        </Pressable>
                    </View>
                </View>
                : null
            }
            <View
                style={[
                    styles.paddingCloseBottom,
                    styles.pill,
                    {
                        alignItems: 'flex-end',
                        overflow: 'hidden'
                    }]}
            >
                {/* {searchFlag ? <View style={[
                    styles.rowLayout,
                    styles.pill,
                    styles.smallGap,
                    {
                        position: 'absolute',
                        zIndex: 1,
                        justifyContent: 'space-between',
                    }
                ]
                }
               >
                    <View style={[styles.input,
                    styles.wide]}>
                        <TextInput
                            autoFocus={true}
                            style={[styles.text,
                            styles.wide]}
                            placeholder="Search"
                            placeholderTextColor={grey}
                            onChangeText={text => {
                                if (text == "")
                                    handleSort(props.filesList)
                                else
                                    handleSort(props.filesList.filter((item) => item["name"].includes(text)))
                            }}
                        />
                    </View>

                    <View style={[styles.rowLayout,
                    styles.smallGap]}>
                        <Pressable
                                style={[styles.rowLayout,
                                styles.pill, deepSearch ? styles.pillHighlight : null,
                                styles.padding]}
                                onPressIn={() => { setDeepSearch(!deepSearch) }}>
                                <Text style={[styles.text]}>Deep</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.pill,
                                styles.pillHighlight,
                                styles.padding]}
                                onPressIn={() => { }}>
                                <Image source={require('./assets/search.png')} />
                            </Pressable>
                        <Pressable
                            style={[styles.pill,
                            styles.padding]}
                            onPressIn={() => {
                                handleSort(props.filesList)
                                setSearchFlag(0)
                            }}>
                            <Image style={{ height: 8, width: 8 }} source={require('./assets/close.png')} />
                        </Pressable>
                    </View>
                </View>

                    : null} */}

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{
                        transform: [{ scaleX: -1 }]
                    }}
                >
                    <View style={[
                        styles.rowLayout,
                        {
                            transform: [{ scaleX: -1 }]
                        }
                    ]
                    }>
                        <Pressable
                            style={[styles.pill,
                            styles.padding]}
                            onPress={() => {
                                setFuncId(0)
                            }}>
                            <Image
                                style={[styles.imageIcon]}
                                source={require('./assets/copy.png')} />
                        </Pressable>
                        <Pressable
                            style={[styles.pill,
                            styles.padding]}
                            onPress={() => {
                                setFuncId(1)
                            }}>
                            <Image
                                style={[styles.imageIcon]}
                                source={require('./assets/move.png')} />
                        </Pressable>
                        <Pressable
                            style={[styles.pill,
                            styles.padding]}
                            onPress={() => {
                                setFuncId(3)
                            }}>
                            <Image
                                style={[styles.imageIcon]}
                                source={require('./assets/rename.png')} />
                        </Pressable>
                        <Pressable
                            style={[styles.pill,
                            styles.padding]}
                            onPress={() => {
                                setFuncId(2)
                            }}>
                            <Image
                                style={[styles.imageIcon]}
                                source={require('./assets/delete.png')} />
                        </Pressable>
                        <Pressable
                            style={[styles.pill,
                            styles.text,
                            styles.padding]}
                            onPress={() => { shareFiles() }}>
                            <Image
                                style={[styles.imageIcon]}
                                source={require('./assets/share.png')} />
                        </Pressable>
                        <Text style={{ color: secondaryColor }}>  |  </Text>
                        <Pressable
                            style={[styles.pill,
                            styles.text,
                            styles.padding]}
                            onPress={() => { newItem(1) }}>
                            <Image
                                style={[styles.imageIcon]}
                                source={require('./assets/newfile.png')} />
                        </Pressable>
                        <Pressable
                            style={[styles.pill,
                            styles.text,
                            styles.padding]}
                            onPress={() => { newItem(0) }}>
                            <Image
                                style={[styles.imageIcon]}
                                source={require('./assets/newfolder.png')} />
                        </Pressable>
                        <Pressable
                            style={[styles.pill,
                            styles.padding]}
                            onPress={() => {
                                setFavouritesModal(1)
                            }}>
                            <Image
                                style={[styles.imageIcon]}
                                source={require('./assets/favourite.png')} />
                        </Pressable>
                        {/* <Pressable
                        style={[styles.pill,
                        styles.text,
                        onPressIn={() => { loadDetails(selectedItems[0]["path"]) }}>
                        </Pressable> */}
                        <Pressable
                            style={[styles.pill,
                            styles.padding]}
                            onPress={() => {
                                setContextMenu(1)
                            }}>
                            <Image source={require('./assets/horzmenu.png')} />
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
            <View style={[styles.rowLayout,
            styles.mediumGap, { paddingTop: 10, justifyContent: 'space-between' }]}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <View
                        style={[styles.rowLayout,
                        styles.mediumGap]}
                    >
                        {
                            // useMemo(() => (
                            Object.keys(tabs).map((index) =>
                                <TabButton
                                    key={index}
                                    tabData={tabs[index]}
                                    index={index}
                                    currTab={currTab}
                                    setCurrTab={setCurrTab}
                                    currTabStatic={currTabStatic}
                                    // ref={ref => {
                                    //     buttonRefs.current[i] = ref
                                    //     console.log(i, ref)
                                    // }}
                                    width={width}
                                    deleteCurrTab={deleteCurrTab}
                                />

                            )
                            // )
                            //     , [tabs])
                        }
                    </View>
                </ScrollView>
                <>
                    {showPaste ?
                        <Pressable
                            style={[styles.pill,
                            styles.bordered,
                            styles.padding
                            ]}
                            onPressIn={() => { startShifting() }}>
                            <Image source={require('./assets/paste.png')} />
                        </Pressable>
                        : null}

                    <Pressable
                        style={[
                            styles.pill,
                            styles.padding
                        ]}
                        onPressIn={() => { addNewTab(null, null, null) }}>
                        <Text style={styles.text}>+</Text>
                    </Pressable>
                </>
            </View>
            {/* <Pressable onPressIn={() => console.log("abcd[]efgh")}><Text>Show progress</Text></Pressable> */}
        </View>
    );
};
export default App