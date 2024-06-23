import { useEffect, useReducer, useState } from "react";
import { Text, View, Dimensions, Pressable } from "react-native";
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

    //modals
    const [favouriteItems, setFavouriteItems] = useState([])
    const [mediaType, setMediaType] = useState(0)
    const [mediaBox, setMediaBox] = useState(0)

    //copy move delete
    const progressWidth = useSharedValue(0);
    const [progress, setProgress] = useState(0)
    const height = useSharedValue(0);
    const animatedWidthStyle = useAnimatedStyle(() => ({
        width: `${progressWidth.value}%`
    })
    )

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

    return (
        <CombinedReducersContext.Provider value={state}>
            <CombinedDispatchContext.Provider value={dispatch}>
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
                        {Object.keys(state.tabs).map((index) =>
                            <Window
                                key={index}
                                index={index}
                                setMediaBox={setMediaBox}
                                setMediaType={setMediaType}
                            />
                        )}
                    </View>
                    <ToolBar
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