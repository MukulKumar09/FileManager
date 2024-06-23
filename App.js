import { useEffect, useReducer, useRef, useState } from "react";
import { Text, View, Dimensions, Image, Pressable } from "react-native";
import { CombinedReducersContext, CombinedDispatchContext } from "./Context/Context"
import { Easing, ReduceMotion, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import FileViewer from "react-native-file-viewer";
import Window from "./Window";
import styles from "./styles";
import ToolBar from "./Features/ToolBar/ToolBar";
import Tabbar from "./Features/Tabbar/Tabbar";
import MediaWindow from "./Features/MediaWindow/MediaWindow";
import Modals from "./Modals/Modals";
import ItemExistsModal from "./Modals/ItemExistsModal/ItemExistsModal";
import DeleteHandler from "./Handlers/DeleteHandler";
import DeleteModal from "./Modals/DeleteModal/DeleteModal";
import OperationWindow from "./Features/OperationWindow/OperationWindow";
import InputModal from "./Modals/InputModal/InputModal";
import useMountingPoints from "./Hooks/useMountingPoints";
import useCombinedReducers from "./Hooks/useCombinedReducers";
import useInitStates from "./Hooks/useInitStates";

const App = () => {

    const [state, dispatch] = useReducer(useCombinedReducers, useInitStates());
    const currTabStatic = useRef("0") //to set tab path with latest currtab value
    const [favouriteItems, setFavouriteItems] = useState([])

    //modals
    const [contextMenu, setContextMenu] = useState(0)
    const [favouritesModal, setFavouritesModal] = useState(0)
    const [clipBoardModal, setClipBoardModal] = useState(0)
    const [aboutModal, setAboutModal] = useState(0)

    //copy move delete
    const [showPaste, setShowPaste] = useState(0)
    const progressWidth = useSharedValue(0);
    const [progress, setProgress] = useState(0)
    const height = useSharedValue(0);
    const animatedWidthStyle = useAnimatedStyle(() => ({
        width: `${progressWidth.value}%`
    })
    )
    const [mediaType, setMediaType] = useState(0)
    const [mediaBox, setMediaBox] = useState(0)

    let width = Dimensions.get('window').width

    useEffect(() => { //first find all mounting points
        useMountingPoints(dispatch)
    }, [])

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

    const breadCrumbsTabName = () => {
        let path = state.tabs[state.currentTab]["path"]

        if (path == "Home") {
            return []
        } else {
            let obj = []
            let basePath
            let baseName
            for (let i = 0; i < state.mountingPoints.length; i++) {
                if (path.includes(state.mountingPoints[i]["path"])) {
                    basePath = state.mountingPoints[i]["path"]
                    baseName = state.mountingPoints[i]["name"]
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

    const fileHandler = (item) => {
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
                    {state.operationWindow ?
                        <OperationWindow />
                        : null}
                    {state.itemExistsModal ?
                        <ItemExistsModal />
                        : null}
                    {state.inputModal ?
                        <InputModal />
                        : null}
                    {state.deleteModal ?
                        <DeleteModal />
                        : null}

                    {
                        aboutModal || favouritesModal || clipBoardModal ?
                            <Modals
                                favouriteItems={favouriteItems}
                                clipBoardModal={clipBoardModal}
                                aboutModal={aboutModal}
                                favouritesModal={favouritesModal}
                                setClipBoardModal={setClipBoardModal}
                                Icon={Icon}
                                setFavouritesModal={setFavouritesModal}
                                setFavouriteItems={setFavouriteItems}
                                setAboutModal={setAboutModal}
                            />
                            : null}
                    <MediaWindow
                        mediaType={mediaType}
                        height={height}
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
                                    breadCrumbsTabName={breadCrumbsTabName}
                                    Icon={Icon}
                                    openExternally={openExternally}
                                    setMediaBox={setMediaBox}
                                    setMediaType={setMediaType}
                                    fileHandler={fileHandler}
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
                        setShowPaste={setShowPaste}
                        setContextMenu={setContextMenu}
                        setFavouritesModal={setFavouritesModal}
                        setClipBoardModal={setClipBoardModal}
                        setAboutModal={setAboutModal}
                    />
                    <Tabbar
                        currTabStatic={currTabStatic}
                        showPaste={showPaste}
                        width={width}
                    />
                </View>
                <Pressable onPress={() => console.log(
                    state.cache
                )}><Text>SHow all</Text></Pressable>
            </CombinedDispatchContext.Provider>
        </CombinedReducersContext.Provider>
    );
};
export default App