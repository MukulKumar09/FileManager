import { Dimensions, BackHandler, Text, TouchableOpacity, View, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Video from "react-native-video";
import styles, { backgroundColor, secondaryColor } from "../../styles";
import MaterialIcon from "../../Common/SmallMaterialIcon/SmallMaterialIcon";
import Animated, { FadeInUp, FadeOutUp, LinearTransition, clamp, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useState, useEffect, useRef, createRef } from "react";

function MediaViewer() {
    const dispatch = useDispatch()
    const state = {
        mediaBox: useSelector(state => state.mediaBox),
        mediaType: useSelector(state => state.mediaType),
    }
    const [fullScreen, setFullScreen] = useState(0)

    const { width, height } = Dimensions.get('screen');

    ////////scale
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
                1,
                Math.max(width / 80, height / 80)
            );
        });

    const pan = Gesture.Pan()
        .minDistance(1)
        .onStart(() => {
            prevTranslationX.value = translationX.value;
            prevTranslationY.value = translationY.value;
        })
        .onUpdate((event) => {
            if (scale.value == 1) {
                translationX.value = 0
                translationY.value = 0
            } else {
                const maxTranslateX = width / 2 - 50;
                const maxTranslateY = height / 2 - 50;

                translationX.value = clamp(
                    prevTranslationX.value + event.translationX,
                    -maxTranslateX,
                    maxTranslateX
                );
                translationY.value = clamp(
                    prevTranslationY.value + event.translationY,
                    -maxTranslateY,
                    maxTranslateY
                );
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
            // layout={LinearTransition}
            style={{
                position: 'absolute',
                overflow: 'hidden',
                zIndex: 1,
                left: 0,
                right: 0,
                height: fullScreen ? '100%' : Math.round(Dimensions.get('window').width * 9 / 16),
            }}>
            <View
                style={
                    {
                        backgroundColor: backgroundColor,
                        flex: 1,
                    }
                }>
                {state.mediaType === 1 && <GestureHandlerRootView>
                    <GestureDetector gesture={Gesture.Simultaneous(pinch, pan)}>
                        <Animated.View
                            style={[boxAnimatedStyles,]}>
                            <Image
                                source={{ uri: 'file://' + state.mediaBox["path"] }}
                                style={{

                                    width: '100%',
                                    height: '100%',
                                }}
                                resizeMode="contain"
                            />
                        </Animated.View>
                    </GestureDetector>
                </GestureHandlerRootView>
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
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={
                        [
                            styles.text,
                            styles.wide,
                            {
                                padding: 15,
                                color: 'white'
                            }
                        ]
                    }>{state.mediaBox["name"]}</Text>
                <TouchableOpacity
                    style={
                        {
                            padding: 15
                        }
                    }
                    onPress={() => setFullScreen(!fullScreen)}>
                    <MaterialIcon name="fullscreen" />
                </TouchableOpacity>
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
        </Animated.View>
    );
}
export default MediaViewer