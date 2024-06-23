import { useEffect, useReducer, useRef, useState } from "react";
import { Text, View, Dimensions, Image, Pressable } from "react-native";
import { CombinedReducersContext, CombinedDispatchContext } from "./Context/Context"
import { Easing, ReduceMotion, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import Window from "./Window";
import styles from "./styles";
import ToolBar from "./Features/ToolBar/ToolBar";
import Tabbar from "./Features/Tabbar/Tabbar";
import MediaWindow from "./Features/MediaWindow/MediaWindow";
import Modals from "./Modals/Modals";
import useMountingPoints from "./Hooks/useMountingPoints";
import useCombinedReducers from "./Hooks/useCombinedReducers";
import useInitStates from "./Hooks/useInitStates";

const App = () => {

    const [state, dispatch] = useReducer(useCombinedReducers, useInitStates());
    const [favouriteItems, setFavouriteItems] = useState([])

    //modals
    const [contextMenu, setContextMenu] = useState(0)
    const [favouritesModal, setFavouritesModal] = useState(0)
    const [clipBoardModal, setClipBoardModal] = useState(0)
    const [aboutModal, setAboutModal] = useState(0)

    //copy move delete
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
                                    setMediaBox={setMediaBox}
                                    setMediaType={setMediaType}
                                    setClipBoardModal={setClipBoardModal}
                                    setFavouritesModal={setFavouritesModal}
                                />
                            )
                        }
                    </View>
                    <ToolBar
                        contextMenu={contextMenu}
                        setContextMenu={setContextMenu}
                        setFavouritesModal={setFavouritesModal}
                        setClipBoardModal={setClipBoardModal}
                        setAboutModal={setAboutModal}
                    />
                    <Tabbar
                        width={width}
                    />
                </View>
                <Pressable onPress={() => console.log(
                    state.operationType
                )}><Text>SHow all</Text></Pressable>
            </CombinedDispatchContext.Provider>
        </CombinedReducersContext.Provider>
    );
};
export default App