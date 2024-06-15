import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View, ScrollView, Dimensions, Image, ToastAndroid, Modal, TextInput, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import RNFS from 'react-native-fs';
import TabButton from "./TabButton";
import FileViewer from "react-native-file-viewer";
import Window from "./Window";
import MediaViewer from "./MediaViewer";
import styles, { backgroundColor } from "./styles";
import Animated, { Easing, ReduceMotion, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { zip } from 'react-native-zip-archive'

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
    }, [])
    useEffect(() => {
        setMainCache({ "Home": favPaths })
    }, [favPaths])
    const [mainCache, setMainCache] = useState({})

    // const windowRefs = useRef([])

    const currTabStatic = useRef(0)

    const [tabs, setTabs] = useState({})
    const [tabCounter, setTabCounter] = useState(0)
    const tabPaths = useRef([])

    const [favouriteItems, setFavouriteItems] = useState([])

    //modals
    const [favouritesModal, setFavouritesModal] = useState(0)
    const [clipBoardModal, setClipBoardModal] = useState(0)
    const [progressModal, setProgressModal] = useState(0)
    const [inputModal, setInputModal] = useState(0)
    const [deleteModal, setDeleteModal] = useState(0)
    const [existsModal, setExistsModal] = useState(0)

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

    const selectedItemsforOperation = useRef([])
    const operationSource = useRef("")
    const operationDest = useRef("")
    const operationType = useRef(-1)
    const failedItems = useRef([])
    const [selectedItem, setSelectedItem] = useState([]) //for media
    const decisionRef = useRef("")

    const [mediaType, setMediaType] = useState(0)
    const [mediaBox, setMediaBox] = useState(0)

    const nameNewItem = useRef("")


    let width = Dimensions.get('window').width

    useEffect(() => {
        if (!(Object.keys(tabs).includes(tabCounter))) {
            setTabs({
                ...tabs,
                [tabCounter]: {
                    title: "Home",
                    path: "Home",
                    type: "filebrowser",
                    visible: 0
                }
            })
            tabPaths.current.push("Home")
        }
    }, [tabCounter])

    const setTabPath = (path) => {

        const updateTabDetails = () => {
            setTabs({
                ...tabs,
                [currTabStatic.current]: {
                    ...tabs[currTabStatic.current],
                    title: folderName,
                    path: path
                }
            })
        }

        let tempPath, folderName
        if (path == null) { //go up
            path = tabs[currTabStatic.current]["path"]
            if (favPaths.find((i) => i.path == path)) {
                path = "Home"
                folderName = "Home"
                updateTabDetails()
                return 1
            } else {
                path = path.split("/")
                path.pop()
            }
        } else { //go inside
            path = path.split("/")
        }
        tempPath = [...path]
        folderName = tempPath.pop()
        path = path.join("/")
        console.log(path)
        updateTabDetails()
    }


    const changeTab = (item) => {
        setTabs({
            ...tabs,
            [currTabStatic.current]: {
                ...tabs[currTabStatic.current],
                visible: 0
            },
            [item]: {
                ...tabs[item],
                visible: 1,
            }
        })

        currTabStatic.current = item
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
        let path = tabs[currTabStatic.current]["path"]

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

    const deleteTab = () => {
        const deleteLogic = () => {
            let tempTabs = [...tabs]
            tempTabs.splice(currTabStatic.current, 1)
            setTabs(tempTabs)
        }
        if (tabs.length == 1) {
            currTabStatic.current = 0
            deleteLogic()
        } else if (tabs[currTabStatic.current + 1] == undefined) { //last
            deleteLogic()
            currTabStatic.current = currTabStatic.current - 1
        } else {//mid
            deleteLogic()
        }
    }

    const fileHandler = (item) => {
        setSelectedItem(item)
        const parts = item.name.split(".")
        const ext = parts[parts.length - 1]
        if (["jpeg", "png", "jpg", "gif"].includes(ext)) {
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

    const newItem = async (type, path) => {
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
        selectedItemsforOperation.current = selectedItems
        if (type in [0, 1]) {
            operationType.current = type
            operationSource.current = tabPaths.current[currTabStatic.current]
            setShowPaste(1)
            ToastAndroid.showWithGravity(
                selectedItemsforOperation.current.length + " items " + (type ? "ready to move" : "copied"),
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
        if (type == 2) {
            operationType.current = 2
            operationDest.current = tabPaths.current[currTabStatic.current]
            deleteHandler()
        }
        if (type == 3) {
            setShowPaste(0)
            operationType.current = 1 //rename is moveItem
            operationDest.current = tabPaths.current[currTabStatic.current]
            nameNewItem.current = selectedItemsforOperation.current["name"]
            renameHandler(selectedItemsforOperation.current)
        }
        if (type == 4) {
            operationType.current = 4
            operationDest.current = tabPaths.current[currTabStatic.current]
            zipHandler()
        }
    }

    const startShifting = async () => {
        setShowPaste(0)
        operationDest.current = tabPaths.current[currTabStatic.current]
        let collectedItems = []
        const collectFilesFromFolder = async () => {
            for (let i = 0; i < selectedItemsforOperation.current.length; i++) {
                let item = selectedItemsforOperation.current[i]
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
            let srcPath = selectedItemsforOperation.current[0]["path"].split("/")
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
            failedItems.current.push(item)
        }
    }

    const moveHandler = async (item, dest) => {
        try {
            await RNFS.moveFile(item, dest)
        } catch (error) {
            console.log(error)
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
            for (let i = 0; i < selectedItemsforOperation.current.length; i++) {
                if (breakOperation == 1) {
                    break
                } else {
                    let item = selectedItemsforOperation.current[i]
                    try {
                        await RNFS.unlink(item["path"])
                    } catch (err) {
                        console.log(err)
                        failedItems.current.push(item)
                    }
                    setProgress(((i + 1) / selectedItemsforOperation.current.length) * 100)
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
            selectedItemsforOperation.current = []
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
        ToastAndroid.showWithGravity(
            "Item(s) renamed",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
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
            for (let i = 0; i < selectedItemsforOperation.current.length; i++) {
                filesToZip.push(selectedItemsforOperation.current[i]["path"]
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
    };

    return (
        <View style={[styles.mainBody]}>
            {clipBoardModal ?
                <Modal
                    transparent={true}>
                    <TouchableWithoutFeedback
                        onPress={() => setClipBoardModal(0)}
                    >
                        <View style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            position: 'absolute'
                        }}
                        />
                    </TouchableWithoutFeedback>
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
                        <View style={[
                            styles.rowLayout,
                            , {
                                width: '100%',
                                justifyContent: 'space-between'
                            }]}>
                            <Text style={[styles.text,
                            styles.headingText]}>Clipboard</Text>
                            <Text style={[
                                styles.text,
                                styles.textDisabled,
                                {
                                    textDecorationLine: 'underline'
                                }
                            ]} onPress={() => selectedItemsforOperation.current = []}>Clear</Text>
                        </View>
                        <View style={[styles.divider]} />
                        <View style={[styles.mediumGap, { flexDirection: 'column', width: '100%' }]}>
                            {selectedItemsforOperation.current.map(
                                (item, i) =>
                                    <View
                                        key={i}
                                        style={[
                                            styles.rowLayout,
                                            styles.pill
                                        ]}>
                                        <TouchableOpacity
                                            style={[
                                                styles.rowLayout,
                                                styles.bigGap,
                                                styles.wide,
                                                styles.padding
                                            ]}
                                        ><Image style={{ height: 20, width: 20 }} source={require('./assets/folder.png')} />
                                            <Text style={[styles.text]}>{item["name"]}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.padding
                                            ]}
                                            onPress={() => {
                                                selectedItemsforOperation.current.splice(i, 1)
                                            }}
                                        >
                                            <Image style={{ height: 8, width: 8 }} source={require('./assets/close.png')} />
                                        </TouchableOpacity>
                                    </View>
                            )}
                            <View style={[styles.divider]} />
                            <TouchableOpacity
                                style={[
                                    styles.rowLayout,
                                    styles.pill,
                                    styles.bigGap,
                                    styles.wide,
                                    styles.padding
                                ]}
                                onPress={() => selectedItemsforOperation.current = []}
                            ><Image source={require('./assets/newfolder.png')} />
                                <Text style={[styles.text]}>Clear</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal >
                : null
            }
            {existsModal ?
                <Modal
                    transparent={true}
                >
                    <TouchableWithoutFeedback
                        onPress={() => {
                            decisionRef.current.resolve(1);
                            setExistsModal(0)
                        }}
                    >
                        <View style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            position: 'absolute'
                        }}
                        />
                    </TouchableWithoutFeedback>
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
                            <TouchableOpacity
                                style={[styles.pill,
                                styles.pillHighlight,
                                styles.padding]}
                                onPress={async () => {
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
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.pill,
                                styles.padding]}
                                onPress={() => {
                                    decisionRef.current.resolve(0);
                                    setExistsModal(0)
                                }
                                }
                            >
                                <Text style={[styles.text]}>Skip</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.pill,
                                styles.padding]}
                                onPress={() => {
                                    decisionRef.current.resolve(1);
                                    setExistsModal(0)
                                }}
                            >
                                <Text style={[styles.text]}>Overwrite</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                : null
            }
            {inputModal ?
                <Modal
                    transparent={true}
                >
                    <TouchableWithoutFeedback
                        onPress={() => setInputModal(0)}
                    >
                        <View style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            position: 'absolute'
                        }}
                        />
                    </TouchableWithoutFeedback>

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
                        <Text style={[styles.text]}>
                            New Name for {inputModal}
                        </Text>
                        <View style={[styles.divider]} />
                        {alreadyExists ? <Text style={[styles.text,
                        styles.smallText]}>Already exists!</Text> : null}
                        <View style={[styles.rowLayout,
                        styles.pill,
                        styles.input]}>
                            <TextInput
                                style={[styles.text,
                                styles.wide]}
                                multiline={true}
                                autoFocus={true}
                                defaultValue={nameNewItem.current}
                                onChangeText={text => {
                                    for (let i = 0; i < mainCache[tabPaths.current[currTabStatic.current]].length; i++) {
                                        if (mainCache[tabPaths.current[currTabStatic.current]][i]["name"] == text) {
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
                            <TouchableOpacity
                                onPress={() => {
                                    nameNewItem.current = ""
                                    setInputModal(0)
                                }
                                }
                                style={[styles.pill,
                                styles.wide,
                                styles.padding]}>
                                <Text style={[styles.text]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={alreadyExists ? true : false}
                                onPress={() => {
                                    inputRef.current.resolve(nameNewItem.current)
                                }
                                }
                                style={[styles.pill,
                                styles.pillHighlight,
                                styles.wide,
                                styles.padding]}>
                                <Text style={[styles.text, alreadyExists ? styles.textDisabled : null]}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                : null
            }
            {deleteModal ? <Modal
                transparent={true}
            >
                <TouchableWithoutFeedback
                    onPress={() => setInputModal(0)}
                >
                    <View style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        position: 'absolute'
                    }}
                    />
                </TouchableWithoutFeedback>

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
                    <Text style={[styles.text]}>Delete item(s)?</Text>
                    <View style={[styles.divider]} />
                    <Text style={[styles.text,
                    styles.textDisabled]}>Following items will be deleted:</Text>
                    <View style={{ flexDirection: 'column', marginBottom: 20 }}>
                        {selectedItemsforOperation.current.map((item, i) =>
                            <Text key={i} style={[styles.text,
                            styles.smallText]}>{item["name"]}</Text>
                        )}
                    </View>
                    <View style={[styles.rowLayout,
                    styles.bigGap]}>
                        <TouchableOpacity
                            onPress={() => {
                                deleteRef.current.resolve(0)
                            }
                            }
                            style={[styles.pill,
                            styles.wide,
                            styles.padding]}>
                            <Text style={[styles.text]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={alreadyExists ? true : false}
                            onPress={() => {
                                deleteRef.current.resolve(1)
                            }
                            }
                            style={[styles.pill,
                            styles.pillHighlight,
                            styles.wide,
                            styles.padding]}>
                            <Text style={[styles.text, alreadyExists ? styles.textDisabled : null]}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
                : null
            }
            {favouritesModal ?
                <Modal
                    transparent={true}>
                    <TouchableWithoutFeedback
                        onPress={() => setFavouritesModal(0)}
                    >
                        <View style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            position: 'absolute'
                        }}
                        />
                    </TouchableWithoutFeedback>
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
                        styles.headingText]}>Favourites</Text>
                        <View style={[styles.divider]} />
                        <View style={[styles.mediumGap, { flexDirection: 'column', width: '100%' }]}>
                            {Object.keys(favouriteItems).length > 0 && favouriteItems.map(
                                (item, i) =>
                                    <View
                                        key={i}
                                        style={[
                                            styles.rowLayout,
                                            styles.pill
                                        ]}>
                                        <TouchableOpacity
                                            style={[
                                                styles.rowLayout,
                                                styles.bigGap,
                                                styles.wide,
                                                styles.padding
                                            ]}
                                            onPress={() => {
                                                setFavouritesModal(0)
                                            }}
                                        ><Image style={{ height: 20, width: 20 }} source={require('./assets/folder.png')} />
                                            <Text style={[styles.text]}>{item["title"]}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.padding
                                            ]}
                                            onPress={() => {
                                                let tempFavItems = [...favouriteItems]
                                                tempFavItems.splice(i, 1)
                                                props.setFavouriteItems(tempFavItems)
                                            }}
                                        >
                                            <Image style={{ height: 8, width: 8 }} source={require('./assets/close.png')} />
                                        </TouchableOpacity>
                                    </View>
                            )}
                            <View style={[styles.divider]} />
                            <TouchableOpacity
                                style={[
                                    styles.rowLayout,
                                    styles.pill,
                                    styles.bigGap,
                                    styles.wide,
                                    styles.padding
                                ]}
                                onPress={() => {
                                    let favPath = tabPaths.current[currTabStatic.current]
                                    let favTitle = favPath.split("/").pop()
                                    let newFavItem = {
                                        'title': favTitle,
                                        "path": favPath
                                    }
                                    if (favouriteItems.find((item) => item.path == favPath) == undefined) {
                                        setFavouriteItems([...favouriteItems, newFavItem])
                                    } else {
                                        ToastAndroid.showWithGravity(
                                            "Item already exists",
                                            ToastAndroid.SHORT,
                                            ToastAndroid.CENTER,
                                        );
                                    }
                                }}
                            ><Image source={require('./assets/newfolder.png')} />
                                <Text style={[styles.text]}>Add Current Folder</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal >
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
                    Object.keys(tabs).map((index, i) =>

                        <Window
                            key={index}
                            buildCache={buildCache}
                            breadCrumbsTabName={breadCrumbsTabName}
                            tabData={tabs[index]}
                            setTabPath={setTabPath}
                            index={i}
                            mainCache={mainCache}
                            openExternally={openExternally}
                            // ref={(ref) => {
                            //     windowRefs.current[i] = ref
                            // }
                            // }
                            selectItem={selectItem}
                            setMediaBox={setMediaBox}
                            setMediaType={setMediaType}
                            fileHandler={fileHandler}
                            readySet={readySet}
                            newItem={newItem}
                            setClipBoardModal={setClipBoardModal}
                            setFavouritesModal={setFavouritesModal}
                        />
                    )
                    // , [tabs, mainCache])
                }
            </View>
            {
                progressModal == 1 &&
                (<View style={[
                    styles.pill,
                    styles.paddingCloseBottom,
                    {
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
                            Object.keys(tabs).map((index, i) =>
                                <TabButton
                                    key={index}
                                    tabData={tabs[index]}
                                    index={i}
                                    // ref={ref => {
                                    //     buttonRefs.current[i] = ref
                                    //     console.log(i, ref)
                                    // }}
                                    changeTab={changeTab}
                                    width={width}
                                    deleteTab={deleteTab}
                                />

                            )
                            // )
                            //     , [tabs])
                        }
                    </View>
                </ScrollView>
                <>
                    {showPaste ?
                        <TouchableOpacity
                            style={[styles.pill,
                            styles.bordered,
                            styles.padding]}
                            onPress={() => { startShifting() }}>
                            <Image source={require('./assets/paste.png')} />
                        </TouchableOpacity>
                        : null}

                    <TouchableOpacity
                        style={[styles.pill,
                        styles.padding]}
                        onPress={() => { setTabCounter(tabCounter + 1) }}>
                        <Text style={styles.text}>+</Text>
                    </TouchableOpacity>
                </>
            </View>
            <TouchableOpacity onPress={() => console.log(tabs)}><Text>Show progress</Text></TouchableOpacity>
        </View >
    );
};
export default App