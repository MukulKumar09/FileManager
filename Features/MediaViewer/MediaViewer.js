import { Dimensions, BackHandler, Text, TouchableOpacity, View, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Video from "react-native-video";
import styles, { secondaryColor } from "../../styles";
import MaterialIcon from "../../Common/SmallMaterialIcon/SmallMaterialIcon";
import Animated, { Easing, FadeInUp, FadeOutUp, ReduceMotion, clamp, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useEffect } from "react";

function MediaViewer() {
    const dispatch = useDispatch()
    const state = {
        mediaBox: useSelector(state => state.mediaBox),
        mediaType: useSelector(state => state.mediaType),
    }
    const { width, height } = Dimensions.get('screen');

    let h = Math.round(Dimensions.get('window').width * 9 / 16)
    let fH = Dimensions.get('window').height
    const wheight = useSharedValue(h);
    const prevWheight = useSharedValue(0)
    const wStyle = useAnimatedStyle(() => ({
        height: wheight.value
    }))
    const panWindow = Gesture.Pan()
        .minDistance(1)
        .onStart(() => {
            prevWheight.value = wheight.value;
        })
        .onUpdate((event) => {
            wheight.value = clamp(
                prevWheight.value + event.translationY,
                h,
                fH
            );
        })


    const scale = useSharedValue(1);
    const startScale = useSharedValue(0);
    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);
    const prevTranslationX = useSharedValue(0);
    const prevTranslationY = useSharedValue(0);

    const boxAnimatedStyles = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
            { translateX: translationX.value },
            { translateY: translationY.value },
        ],
    }));

    const pinch = Gesture.Pinch()
        .onStart(() => {
            startScale.value = scale.value;
        })
        .onUpdate((event) => {
            scale.value = clamp(
                startScale.value * event.scale,
                0.5,
                Math.max(width / 80, height / 80)
            );
        })
        .onEnd(() => {
            if (scale.value < 1.3) {
                scale.value = withSpring(1)
            }
        });

    const pan = Gesture.Pan()
        .minDistance(1)
        .onStart(() => {
            prevTranslationX.value = translationX.value;
            prevTranslationY.value = translationY.value;
        })
        .onUpdate((event) => {
            if (scale.value > 1) {
                const maxTranslateX = width / 2 - 50;
                const maxTranslateY = height / 2 - 50;

                translationX.value =
                    prevTranslationX.value + (event.translationX / scale.value),
                    translationX.value = clamp(
                        prevTranslationX.value + (event.translationX / scale.value),
                        -maxTranslateX,
                        maxTranslateX
                    );

                translationY.value =
                    prevTranslationY.value + (event.translationY / scale.value),
                    translationY.value = clamp(
                        prevTranslationY.value + (event.translationY / scale.value),
                        -maxTranslateY / 2,
                        maxTranslateY / 2
                    );
            }
        })
        .onEnd((event) => {
            if (scale.value < 1.3) {
                translationX.value = withSpring(0)
                translationY.value = withSpring(0)
            }
        })

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

        <Animated.View
            entering={FadeInUp.duration(100)}
            exiting={FadeOutUp.duration(100)}
            style={
                [
                    wStyle,
                    {
                        position: 'absolute',
                        overflow: 'hidden',
                        zIndex: 1,
                        left: 0,
                        right: 0,
                    }
                ]
            }>
            <GestureHandlerRootView>
                <View
                    style={
                        {
                            backgroundColor: 'black',
                            flex: 1,
                        }
                    }>
                    {state.mediaType === 1 &&
                        <GestureDetector gesture={Gesture.Simultaneous(pan, pinch)}>
                            <Animated.View
                                style={[
                                    boxAnimatedStyles,
                                ]}
                            >
                                <Image
                                    source={{ uri: 'file://' + state.mediaBox["path"] }}
                                    style={[
                                        {
                                            backgroundColor: 'black',
                                            height: '100%',
                                            width: '100%'
                                        }
                                    ]}
                                    resizeMode="contain"
                                />
                            </Animated.View>
                        </GestureDetector>
                    }
                    {state.mediaType === 2 && <Video
                        // Can be a URL or a local file.
                        source={{ uri: 'file://' + state.mediaBox["path"] }}
                        controls={true}
                        repeat={true}
                        autoPlay={true}
                        style={
                            {
                                flex: 1,
                                resizeMode: 'contain'
                            }
                        }
                    />}
                </View>
                <View style={
                    {
                        backgroundColor: secondaryColor,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }
                }>
                    <GestureDetector gesture={panWindow}>
                        <View style={
                            [
                                styles.rowLayout,
                                styles.mediumGap,
                                styles.wide,
                                { padding: 15, }
                            ]
                        }>
                            <MaterialIcon name="drag-vertical" />
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={
                                    [
                                        styles.text,
                                        {

                                            color: 'white'
                                        }
                                    ]
                                }>{state.mediaBox["name"]}</Text>
                        </View>
                    </GestureDetector>
                    {/* <TouchableOpacity
                        style={
                            {
                                padding: 15
                            }
                        }
                        onPress={() => {
                            wheight.value <= h ?
                                (
                                    wheight.value =
                                    withTiming(fH, {
                                        duration: 1000,
                                        easing: Easing.out(Easing.cubic),
                                        reduceMotion: ReduceMotion.System,
                                    })
                                )
                                :
                                (
                                    scale.value =
                                    withTiming(1, {
                                        duration: 500,
                                        easing: Easing.out(Easing.cubic),
                                        reduceMotion: ReduceMotion.System,
                                    }),
                                    translationX.value =
                                    withTiming(0, {
                                        duration: 500,
                                        easing: Easing.out(Easing.cubic),
                                        reduceMotion: ReduceMotion.System,
                                    }),
                                    translationY.value =
                                    withTiming(0, {
                                        duration: 500,
                                        easing: Easing.out(Easing.cubic),
                                        reduceMotion: ReduceMotion.System,
                                    }),
                                    wheight.value =
                                    withTiming(50, {
                                        duration: 1000,
                                        easing: Easing.out(Easing.cubic),
                                        reduceMotion: ReduceMotion.System,
                                    })
                                )
                        }}>
                        <MaterialIcon name="fullscreen" />
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        style={
                            {
                                padding: 15
                            }
                        }
                        onPress={() => dispatch({
                            type: "SETMEDIABOX",
                            payload: 0
                        })}>
                        <MaterialIcon name="close" />
                    </TouchableOpacity>
                </View>
            </GestureHandlerRootView>
        </Animated.View >
    );
}
export default MediaViewer