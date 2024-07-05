import { useEffect } from "react";
import { View, Dimensions, Pressable, Text, BackHandler } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Window from "./Window";
import styles from "./styles";
import ToolBar from "./Features/ToolBar/ToolBar";
import Tabbar from "./Features/Tabbar/Tabbar";
import MediaWindow from "./Features/MediaWindow/MediaWindow";
import Modals from "./Modals/Modals";
import useMountingPoints from "./Hooks/useMountingPoints";
import OperationWindow from "./Features/OperationWindow/OperationWindow";
import useNavigateParent from "./Hooks/useNavigateParent";

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
            if (state.tabs[state.currentTab]["path"] == "Home")
                return false
            else if (state.mediaBox)
                dispatch({
                    type: "SETMEDIABOX",
                    payload: 0
                })
            else
                useNavigateParent(state, dispatch)
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    }, [state.tabs, state.currentTab, state.cache, state.mediaBox])

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
                {Object.keys(state.tabs).map((index) =>
                    <Window
                        key={index}
                        index={index}
                    />
                )}
            </View>
            {state.operationWindow ?
                <OperationWindow />
                : null}
            <ToolBar />
            <Tabbar width={width} />
        </View>

    );
};
export default App