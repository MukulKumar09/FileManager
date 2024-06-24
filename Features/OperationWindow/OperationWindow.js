import { Text, View, ActivityIndicator } from "react-native";
import { useContext, useEffect } from "react";
import Animated, { Easing, ReduceMotion, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import styles from "../../styles";
import { CombinedReducersContext, CombinedDispatchContext } from "../../Context/Context"
import useStartOperation from "../../Hooks/useStartOperation";
export default function OperationWindow() {
    const state = useContext(CombinedReducersContext)
    const dispatch = useContext(CombinedDispatchContext)
    const progressWidth = useSharedValue(0);
    const animatedWidthStyle = useAnimatedStyle(() => ({
        width: `${progressWidth.value}%`
    })
    )
    useEffect(() => {
        useStartOperation(state, dispatch)
    }, [])

    useEffect(() => {
        progressWidth.value =
            withTiming(state.progress, {
                duration: 730,
                easing: Easing.out(Easing.exp),
                reduceMotion: ReduceMotion.System,
            }
            )
    }, [state.progress])
    return (<View style={[
        styles.pill,
        styles.paddingCloseBottom,
        {
            // position: 'absolute',
            // zIndex: 2,
            // top: 0,
            // left: 0,
            // right: 0,
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
                    ({state.progress}%) {state.operationType == 0 && "Copy"}
                    {state.operationType == 1 && "Move"}
                    {state.operationType == 2 && "Delete"}
                    {state.operationType == 3 && "Zipp"}
                    ing {state.itemInOperation}
                </Text>
            </View>
            <Text
                onPress={() => dispatch({
                    type: "OPERATIONTYPE",
                    payload: -2,
                })
                }
                style={[
                    styles.text,
                    styles.smallText,
                    {
                        textDecorationLine: 'underline'
                    }
                ]}
            >Cancel</Text>
        </View>
    </View>
    )
}