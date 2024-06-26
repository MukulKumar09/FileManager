import { useEffect, useState } from "react";
import { View, Dimensions } from "react-native";
import { Easing, ReduceMotion, useSharedValue, withTiming } from 'react-native-reanimated';
import Window from "./Window";
import styles from "./styles";
import ToolBar from "./Features/ToolBar/ToolBar";
import Tabbar from "./Features/Tabbar/Tabbar";
import MediaWindow from "./Features/MediaWindow/MediaWindow";
import Modals from "./Modals/Modals";
import useMountingPoints from "./Hooks/useMountingPoints";
import OperationWindow from "./Features/OperationWindow/OperationWindow";
import { Provider, } from "react-redux"
import { createStore } from "redux"
import rootReducer from "./Reducers"


const App = () => {
    const store = createStore(rootReducer)

    //modals
    const [favouriteItems, setFavouriteItems] = useState([])
    const [mediaType, setMediaType] = useState(0)
    const [mediaBox, setMediaBox] = useState(0)
    const height = useSharedValue(0);
    //copy move delete

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


    return (
        <Provider store={store}>
            <View style={[styles.mainBody]}>
                <Modals
                    favouriteItems={favouriteItems}
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
                    {Object.keys(useSelector(state => state.tabs)).map((index) =>
                        <Window
                            key={index}
                            index={index}
                            setMediaBox={setMediaBox}
                            setMediaType={setMediaType}
                        />
                    )}
                </View>
                {useSelector(state => state.operationWindow) ?
                    <OperationWindow />
                    : null}
                <ToolBar />
                <Tabbar width={width} />
            </View>

            {/* <Pressable onPress={() => dispatch({
                    type: "SETPROGRESS",
                    payload: 60
                })}><Text>SHow all</Text></Pressable> */}
        </Provider>
    );
};
export default App