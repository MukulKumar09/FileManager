import { Pressable, View } from "react-native";
import styles, { secondaryColor } from "../../styles";
import { useSelector, useDispatch } from "react-redux"
import MenuItem from "../../Common/MenuItem/MenuItem";

export default function TabsContextMenu() {
    const state = {
        tabs: useSelector(state => state.tabs),
        currentTab: useSelector(state => state.currentTab),
        tabCounter: useSelector(state => state.tabCounter)
    }
    const dispatch = useDispatch()
    return (
        <View style={{
            position: 'absolute',
            zIndex: 1,
            height: '100%',
            width: '100%',
        }}>
            <Pressable
                onPressIn={() => dispatch({
                    type: "TABSCONTEXTMENU"
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
                        bottom: 50,
                        right: 10,
                        width: '60%',
                        elevation: 10,
                        shadowColor: 'black',
                    }
                ]}
            >
                <MenuItem
                    icon="tab-unselected"
                    name="Close all tabs"
                    functionName={() => {
                        dispatch({
                            type: "RESETTABS"
                        })

                        dispatch({
                            type: "SETCURRENTTAB",
                            payload: "0"
                        })
                        dispatch({
                            type: "TABSCONTEXTMENU"
                        })
                    }}
                />
                <MenuItem
                    icon="tab-remove"
                    name="Close other tabs"
                    functionName={() => {
                        dispatch({
                            type: "DELETEOTHERTABS",
                            payload: state.currentTab
                        })
                        dispatch({
                            type: "TABSCONTEXTMENU"
                        })
                    }}
                />
                <MenuItem
                    icon="tab-minus"
                    name="Close this tab"
                    functionName={() => {
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
                            type: "TABSCONTEXTMENU"
                        })
                    }}
                />
                <MenuItem
                    icon="select-all"
                    name="All tabs"
                    functionName={() => dispatch({
                        type: "ALLTABSMODAL",
                    })}
                />
                <View style={[styles.divider, { backgroundColor: secondaryColor }]} />
                <MenuItem
                    icon="tab-plus"
                    name="New File Browser"
                    functionName={() => {
                        dispatch({
                            type: "ADDTAB",
                            payload: {
                                tabKey: state.tabCounter,
                                title: "Home",
                                path: "Home",
                                type: "filebrowser",
                            }
                        })
                        dispatch({
                            type: "SETCURRENTTAB",
                            payload: state.tabCounter
                        })
                        dispatch({
                            type: "INCREASETABCOUNTER",
                        })
                        dispatch({
                            type: "TABSCONTEXTMENU"
                        })
                    }
                    }
                />
                <MenuItem
                    icon="web"
                    name="New Web Browser"
                    functionName={() => {
                        dispatch({
                            type: "ADDTAB",
                            payload: {
                                tabKey: state.tabCounter,
                                title: "Browser",
                                path: "[Home]",
                                type: "webbrowser",
                            }
                        })
                        dispatch({
                            type: "SETCURRENTTAB",
                            payload: state.tabCounter
                        })
                        dispatch({
                            type: "INCREASETABCOUNTER",
                        })
                        dispatch({
                            type: "TABSCONTEXTMENU"
                        })
                    }}
                />
                <MenuItem
                    icon="tab"
                    name="Duplicate Tab"
                    functionName={() => {
                        dispatch({
                            type: "DUPLICATETAB",
                            payload: {
                                tabKey: state.tabCounter,
                                title: state.tabs[state.currentTab]["title"],
                                path: state.tabs[state.currentTab]["path"],
                                type: state.tabs[state.currentTab]["type"],
                            }
                        })
                        dispatch({
                            type: "SETCURRENTTAB",
                            payload: state.tabCounter
                        })
                        dispatch({
                            type: "INCREASETABCOUNTER",
                        })
                        dispatch({
                            type: "TABSCONTEXTMENU"
                        })
                    }
                    }
                />
            </View>
        </View>
    )
}