import { Text, Pressable, View } from "react-native";
import styles from "../../styles";
import { useSelector, useDispatch } from "react-redux"
import useCache from "../../Hooks/useCache";
import MaterialIcon from "../../Common/MaterialIcon/MaterialIcon";
import useOpenExternally from "../../Hooks/useOpenExternally";

export default function ContextMenu() {
    const state = {
        tabs: useSelector(state => state.tabs),
        currentTab: useSelector(state => state.currentTab),
    }
    const dispatch = useDispatch()
    return (<View style={{
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
            <Pressable
                style={[
                    styles.rowLayout,
                    styles.bigGap,
                    styles.wide,
                    styles.padding
                ]}
                onPress={() => {
                    dispatch({
                        type: "RESETTABS"
                    })

                    dispatch({
                        type: "SETCURRENTTAB",
                        payload: "0"
                    })
                    dispatch({
                        type: "CONTEXTMENU"
                    })
                }}
            >
                <MaterialIcon
                    name="tab-unselected" />
                <Text style={[styles.text, styles.wide]}>Close all tabs</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.rowLayout,
                    styles.bigGap,
                    styles.padding
                ]}
                onPress={() => {
                    let tempTabs = Object.keys(state.tabs)
                    let tabKey = tempTabs.indexOf(state.currentTab.toString())
                    let currentTab
                    if (tempTabs[tabKey + 1]) {
                        currentTab = tempTabs[tabKey + 1]
                    } else {
                        currentTab = tempTabs[tabKey - 1]
                    }
                    if (currentTab) {
                        dispatch({
                            type: "SETCURRENTTAB",
                            payload: currentTab
                        })
                        dispatch({
                            type: "DELETETAB",
                            payload: state.currentTab
                        })
                    } else {
                        dispatch({
                            type: "RESETTABS"
                        })
                        dispatch({
                            type: "SETCURRENTTAB",
                            payload: "0"
                        })
                    }
                    dispatch({
                        type: "CONTEXTMENU"
                    })
                }}
            >
                <MaterialIcon
                    name="tab-minus" />
                <Text style={[styles.text, styles.wide]}>Close this tab</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.rowLayout,
                    styles.bigGap,
                    styles.wide,
                    styles.padding
                ]}
                onPress={() => {
                    dispatch({
                        type: "DELETEOTHERTABS",
                        payload: state.currentTab
                    })
                    dispatch({
                        type: "CONTEXTMENU"
                    })
                }}
            >
                <MaterialIcon
                    name="tab-remove" />
                <Text style={[styles.text, styles.wide]}>Close other tabs</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.rowLayout,
                    styles.bigGap,
                    styles.wide,
                    styles.padding
                ]}
                onPress={
                    () => useCache(dispatch, state.tabs[state.currentTab]["path"])
                }
            >
                <MaterialIcon
                    name="refresh" />
                <Text style={[styles.text, styles.wide]}>Refresh</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.rowLayout,
                    styles.bigGap,
                    styles.wide,
                    styles.padding
                ]}
                onPress={() => {
                    dispatch({
                        type: "FUNCTIONID",
                        payload: 8
                    })
                }}
            >
                <MaterialIcon
                    name="file-move-outline" />
                <Text style={[styles.text, styles.wide]}>Open in another app</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.rowLayout,
                    styles.bigGap,
                    styles.wide,
                    styles.padding
                ]}
                onPress={() => {
                    dispatch({
                        type: "FUNCTIONID",
                        payload: 4
                    })
                }}
            >
                <MaterialIcon
                    name="tab-plus" />
                <Text style={[styles.text, styles.wide]}>Open in new tab</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.rowLayout,
                    styles.bigGap,
                    styles.wide,
                    styles.padding
                ]}
                onPress={() => dispatch({
                    type: "CLIPBOARDMODAL"
                })}
            >
                <MaterialIcon
                    name="clipboard-outline" />
                <Text style={[styles.text, styles.wide]}>Clipboard</Text>
            </Pressable>

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
            <Pressable
                style={[
                    styles.rowLayout,
                    styles.bigGap,
                    styles.wide,
                    styles.padding
                ]}
                onPress={() =>
                    dispatch({
                        type: "FUNCTIONID",
                        payload: 9
                    })
                }
            >
                <MaterialIcon
                    name="details" />
                <Text style={[styles.text, styles.wide]}>Properties</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.rowLayout,
                    styles.bigGap,
                    styles.wide,
                    styles.padding
                ]}
                onPress={() => dispatch({
                    type: "ABOUTMODAL"
                })
                }
            >
                <MaterialIcon
                    name="coffee-outline" />
                <Text style={[styles.text, styles.wide]}>About</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.rowLayout,
                    styles.bigGap,
                    styles.wide,
                    styles.padding
                ]}
                onPress={() => dispatch({
                    type: "CONTEXTMENU"
                })
                }
            >
                <MaterialIcon
                    name="close" />
                <Text style={[styles.text, styles.wide]}>Close</Text>
            </Pressable>
        </View>
    </View>)
}