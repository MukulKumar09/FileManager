import { useEffect } from "react";
import { View, Dimensions, Pressable, Text, BackHandler } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Window from "./Window";
import styles from "./styles";
import FileBrowserToolBar from "./Features/FileBrowserToolBar/FileBrowserToolBar";
import Tabbar from "./Features/Tabbar/Tabbar";
import MediaWindow from "./Features/MediaWindow/MediaWindow";
import Modals from "./Modals/Modals";
import useMountingPoints from "./Hooks/useMountingPoints";
import OperationWindow from "./Features/OperationWindow/OperationWindow";
import Webbrowser from "./Features/Webbrowser/Webbrowser";

const App = () => {
    const dispatch = useDispatch()
    const state = {
        tabs: useSelector(state => state.tabs),
        operationWindow: useSelector(state => state.operationWindow),
        currentTab: useSelector(state => state.currentTab),
        cache: useSelector(state => state.cache["Home"]),
        mediaBox: useSelector(state => state.mediaBox)
    }

    let width = Dimensions.get('window').width


    useEffect(() => { //first find all mounting points
        useMountingPoints(dispatch)
    }, [])

    useEffect(() => {
        const backAction = () => {
            if (state.mediaBox)
                dispatch({
                    type: "SETMEDIABOX",
                    payload: 0
                })
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    }, [state.mediaBox])
    return (
        <View style={[styles.mainBody]}>
            <Modals />
            <MediaWindow />
            <View
                style={
                    {
                        flex: 1
                    }
                }
            >
                {Object.keys(state.tabs).map((index) => {
                    switch (state.tabs[index]["type"]) {
                        case "filebrowser": {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        flex: 1,
                                        display: state.currentTab == index ? "flex" : "none"
                                    }}
                                >
                                    <Window
                                        index={index}
                                    />
                                </View>
                            )
                        }
                        case "webbrowser": {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        flex: 1,
                                        display: state.currentTab == index ? "flex" : "none"
                                    }}
                                >
                                    <Webbrowser
                                        index={index}
                                    />
                                </View>
                            )
                        }
                    }
                }
                )}
            </View>
            {state.operationWindow ?
                <OperationWindow />
                : null}
            {state.tabs[state.currentTab] && state.tabs[state.currentTab]["type"] == "filebrowser" ? <FileBrowserToolBar />
                : null}
            <Tabbar width={width} />
        </View>

    );
};
export default App