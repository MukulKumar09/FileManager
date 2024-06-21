import { Text, Pressable, View, Image } from "react-native";
import { useContext } from "react";
import styles from "../../styles";
import { CombinedReducersContext, CombinedDispatchContext } from "../../Context/Context"
import CacheHandler from "../../Helpers/CacheHandler";

export default function ContextMenu(props) {
    const state = useContext(CombinedReducersContext)
    const dispatch = useContext(CombinedDispatchContext)
    return (<View style={{
        position: 'absolute',
        zIndex: 1,
        height: '100%',
        width: '100%',
    }}>
        <Pressable
            onPressIn={() => props.setContextMenu(0)}
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
                    width: '50%',
                    elevation: 10,
                    shadowColor: 'black',
                }
            ]}
        >
            <Pressable
                style={[
                    styles.padding
                ]}
                onPress={() => {
                    dispatch({
                        type: "RESETTABS"
                    })
                    props.setContextMenu(0)
                }}
            >
                <Text style={[styles.text]}>Close all tabs</Text>
            </Pressable>
            <Pressable
                style={[
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
                    }
                    props.setContextMenu(0)
                }}
            >
                <Text style={[styles.text]}>Close this tab</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.wide,
                    styles.padding
                ]}
                onPress={() => {
                    dispatch({
                        type: "DELETEOTHERTABS",
                        payload: state.currentTab
                    })
                    props.setContextMenu(0)
                }}
            >
                <Text style={[styles.text]}>Close other tabs</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.rowLayout,
                    styles.bigGap,
                    styles.wide,
                    styles.padding
                ]}
                onPress={
                    async () => dispatch({
                        type: "UPDATECACHE",
                        payload: {
                            key: state.tabs[state.currentTab]["path"],
                            value: await CacheHandler(state.tabs[state.currentTab]["path"])
                        }
                    })
                }
            ><Image
                    style={[styles.imageIcon]}
                    source={require('../../assets/refresh.png')} />
                <Text style={[styles.text]}>Refresh</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.rowLayout,
                    styles.bigGap,
                    styles.wide,
                    styles.padding
                ]}
                onPress={() => { }}
            >
                <Image
                    style={[styles.imageIcon]}
                    source={require('../../assets/newtab.png')} />
                <Text style={[styles.text]}>Open in new tab</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.rowLayout,
                    styles.bigGap,
                    styles.wide,
                    styles.padding
                ]}
                onPress={() => { props.setClipBoardModal(1) }}
            >
                <Image
                    style={[styles.imageIcon]}
                    source={require('../../assets/archive.png')} />
                <Text style={[styles.text]}>Clipboard</Text>
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
                                    <Text style={[styles.text]}>Archive</Text>
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
                onPress={() => { props.setAboutModal(1) }}
            ><Image
                    style={[styles.imageIcon]}
                    source={require('../../assets/about.png')} />
                <Text style={[styles.text]}>About</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.rowLayout,
                    styles.bigGap,
                    styles.wide,
                    styles.padding
                ]}
                onPress={() => { props.setContextMenu(0) }}
            ><Image
                    style={[styles.imageIcon]}
                    source={require('../../assets/close.png')} />
                <Text style={[styles.text]}>Close</Text>
            </Pressable>
        </View>
    </View>)
}