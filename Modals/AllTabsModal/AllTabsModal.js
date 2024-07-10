import { Text, Pressable, View, Modal } from "react-native";
import styles, { backgroundColor } from "../../styles";
import { useSelector, useDispatch } from "react-redux"
import MaterialIcon from "../../Common/MaterialIcon/MaterialIcon";
import SmallMaterialIcon from "../../Common/SmallMaterialIcon/SmallMaterialIcon";

export default function AllTabsModal() {
    const dispatch = useDispatch()
    const state = {
        tabs: useSelector(state => state.tabs),
        currentTab: useSelector(state => state.currentTab),
    }
    const icon = (type) => {
        switch (type) {
            case "filebrowser": {
                return <SmallMaterialIcon name="folder" color="orange" />
            }
            case "webbrowser": {
                return <SmallMaterialIcon name="web" color="#4FC3F7" />
            }
        }
    }

    return (<Modal
        onRequestClose={() => dispatch({
            type: "ALLTABSMODAL",
        })}
        transparent={true}
    >
        <Pressable
            onPress={() => dispatch({
                type: "ALLTABSMODAL",
            })}
            style={[styles.modalBackground]}
        />
        <View style={[
            styles.pill,
            styles.modal,
            {
                backgroundColor: backgroundColor,
                position: 'absolute',
                left: 10,
                right: 10,
                bottom: 10,
            }
        ]}>
            <View style={[
                styles.rowLayout,
                styles.padding,
                , {
                    width: '100%',
                    justifyContent: 'space-between'
                }]}>
                <View style={
                    [
                        styles.rowLayout,
                        styles.bigGap,
                    ]
                }>
                    <MaterialIcon name="select-all" />
                    <Text style={[
                        styles.text,
                        styles.headingText
                    ]}>All Tabs</Text>
                </View>
                <Text
                    onPress={() => {
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
                    style={[
                        styles.text,
                        styles.textDisabled,
                        {
                            textDecorationLine: 'underline'
                        }
                    ]}>Close All</Text>
            </View>
            <View style={{ width: '100%' }}>
                <View style={[styles.divider]} />
                <View style={
                    [
                        styles.padding,
                        styles.mediumGap
                    ]
                }>
                    {
                        Object.keys(state.tabs).map((index) => {
                            return (
                                <View
                                    key={index}
                                    style={
                                        [
                                            styles.rowLayout,
                                            styles.pill,
                                            index == state.currentTab && styles.pillHighlight,
                                        ]
                                    }>
                                    <Pressable
                                        onPress={() => {
                                            dispatch({
                                                type: "SETCURRENTTAB",
                                                payload: index
                                            })
                                        }}
                                        style={
                                            [
                                                styles.rowLayout,
                                                styles.padding,
                                                styles.wide,
                                                styles.bigGap,
                                            ]
                                        }
                                    >
                                        {icon(state.tabs[index]["type"])}
                                        <Text style={[styles.text]}>{state.tabs[index]["title"]}</Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={() => {
                                            let tempTabs = Object.keys(state.tabs)
                                            let tabKey = tempTabs.indexOf(state.currentTab.toString())
                                            let currentTab = state.currentTab
                                            if (tempTabs[tabKey + 1]) {
                                                currentTab = tempTabs[tabKey + 1]
                                            } else if (tempTabs[tabKey - 1]) {
                                                currentTab = tempTabs[tabKey - 1]
                                            }
                                            if (tempTabs.length > 1) {
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
                                                    type: "SETCURRENTTAB",
                                                    payload: "0"
                                                })
                                                dispatch({
                                                    type: "RESETTABS"
                                                })
                                            }
                                        }}
                                        style={
                                            [
                                                styles.padding
                                            ]
                                        }
                                    >
                                        <MaterialIcon name="close" />
                                    </Pressable>
                                </View>
                            )
                        }
                        )
                    }
                </View>
                <View style={[styles.divider]} />
            </View>
            <View style={
                [
                    styles.rowLayout,
                    styles.mediumGap,
                    styles.padding,
                    {
                        width: '100%'
                    }
                ]
            }>
                <Pressable
                    onPress={() => {
                        dispatch({
                            type: "DELETEOTHERTABS",
                            payload: state.currentTab
                        })
                        dispatch({
                            type: "TABSCONTEXTMENU"
                        })
                    }}
                    style={[
                        styles.pill,
                        styles.wide,
                        styles.centered,
                        styles.padding
                    ]}
                >
                    <Text style={[styles.text]}>Close Others</Text>
                </Pressable>
                <Pressable
                    onPress={() => dispatch({
                        type: "ALLTABSMODAL",
                    })}
                    style={[
                        styles.pill,
                        styles.bordered,
                        styles.wide,
                        styles.centered,
                        styles.padding
                    ]}
                >
                    <Text style={[styles.text]}>Close</Text>
                </Pressable>
            </View>
        </View>
    </Modal >
    )
}