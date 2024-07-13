import { Dimensions, Image, BackHandler, Text, TouchableOpacity, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Video from "react-native-video";
import styles, { backgroundColor, secondaryColor } from "../../styles";
import MaterialIcon from "../../Common/SmallMaterialIcon/SmallMaterialIcon";
import Animated, { FadeInUp, FadeOutUp, LinearTransition } from 'react-native-reanimated';
import { useState, useEffect } from "react";

function MediaViewer() {
    const dispatch = useDispatch()
    const state = {
        mediaBox: useSelector(state => state.mediaBox),
        mediaType: useSelector(state => state.mediaType),
    }

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
    const [fullScreen, setFullScreen] = useState(0)
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
                {state.mediaType === 1 &&
                    <Image style={
                        {
                            flex: 1,
                            resizeMode: 'contain'
                        }
                    }
                        source={{ uri: 'file://' + state.mediaBox["path"] }} />
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