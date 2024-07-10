import { useSelector, useDispatch } from "react-redux"
import Animated from 'react-native-reanimated';
import { Easing, ReduceMotion, useSharedValue, withTiming } from 'react-native-reanimated';
import MediaViewer from "../MediaViewer/MediaViewer";
import { useEffect } from "react";
import { Dimensions } from "react-native";
export default function MediaWindow() {

    const dispatch = useDispatch()
    const height = useSharedValue(0)
    const state = {
        mediaBox: useSelector(state => state.mediaBox)
    }
    useEffect(() => {
        if (state.mediaBox && height.value == 0) {
            height.value =
                withTiming((height.value + Math.round(Dimensions.get('window').width * 9 / 16 + 50)), {
                    duration: 730,
                    easing: Easing.out(Easing.exp),
                    reduceMotion: ReduceMotion.System,
                })
        }
        if (state.mediaBox == 0 && height.value > 0) {
            height.value =
                withTiming(0, {
                    duration: 730,
                    easing: Easing.out(Easing.exp),
                    reduceMotion: ReduceMotion.System,
                })
        }
    }, [state.mediaBox])

    return (
        <Animated.View
            style={{
                height: height,
                overflow: 'hidden'
            }}
        >
            {state.mediaBox == 0 ?
                null : <MediaViewer />
            }
        </Animated.View>
    )
}