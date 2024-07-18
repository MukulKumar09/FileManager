import { Pressable, View } from "react-native";
import styles, { secondaryColor } from "../../styles";
import { useSelector, useDispatch } from "react-redux"
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import useCache from "../../Hooks/useCache";
import MenuItem from "../../Common/MenuItem/MenuItem";

export default function ContextMenu() {
    const state = {
        tabs: useSelector(state => state.tabs),
        currentTab: useSelector(state => state.currentTab),
        tabCounter: useSelector(state => state.tabCounter)
    }
    const dispatch = useDispatch()
    return (
        <Animated.View
            entering={FadeInDown.duration(50)}
            exiting={FadeOutDown.duration(50)}
            style={{
                position: 'absolute',
                zIndex: 1,
                height: '100%',
                width: '100%',
            }}>
            <Pressable
                onPressIn={() => dispatch({
                    type: "CONTEXTMENU"
                })
                }
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
            >
            </Pressable>
            <View
                style={[
                    styles.pill,
                    {
                        position: 'absolute',
                        bottom: 100,
                        right: 10,
                        width: '60%',
                        elevation: 10,
                        shadowColor: 'black',
                    }
                ]}
            >
                <MenuItem
                    functionName={() => {
                        dispatch({
                            type: "FUNCTIONID",
                            payload: 8
                        })
                    }} icon="file-move-outline" name="Open in another app" />
                <MenuItem
                    functionName={() => {
                        dispatch({
                            type: "FUNCTIONID",
                            payload: 10
                        })
                    }} icon="file-question-outline" name="Open as" />
                <MenuItem
                    functionName={() => {
                        dispatch({
                            type: "FUNCTIONID",
                            payload: 4
                        })
                    }} icon="tab-plus" name="Open in new tab" />
                <View style={[styles.divider, { backgroundColor: secondaryColor }]} />
                <MenuItem
                    functionName={() => useCache(dispatch, state.tabs[state.currentTab]["path"])
                    } icon="refresh" name="Refresh" />
                <MenuItem
                    functionName={() => dispatch({
                        type: "CLIPBOARDMODAL"
                    })} icon="clipboard-outline" name="Clipboard" />
                {/* 
                            <View
                                style={[
                                    styles.rowLayout
                                ]}>
                                <Pressable
                                    style={[
                                        styles.rowLayout,
                                        styles.bigGap,
                                        styles.wide,
                                        styles.padding
                                    ]}
                                    onPressIn={() => { readySet(4, selectedItems) }}
                               ><Image source={require('../../assets/archive.png')} />
                                    <Text style={[styles.text,styles.wide]}>Archive</Text>
                                </Pressable>
                            </View>
                             */}
                <MenuItem
                    functionName={() => {
                        dispatch({
                            type: "RECYCLEBINMODAL"
                        })
                    }} icon="delete-empty-outline" name="Recycle Bin" />
                <MenuItem
                    functionName={() =>
                        dispatch({
                            type: "FUNCTIONID",
                            payload: 9
                        })
                    } icon="details" name="Properties" />
                <MenuItem
                    functionName={() => dispatch({
                        type: "ABOUTMODAL"
                    })
                    } icon="coffee-outline" name="About" />
                <MenuItem
                    functionName={() => dispatch({
                        type: "CONTEXTMENU"
                    })
                    } icon="close" name="Close" />
            </View>
        </Animated.View>)
}