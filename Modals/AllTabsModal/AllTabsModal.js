import { Text, Pressable, View, Modal } from "react-native";
import styles, { backgroundColor } from "../../styles";
import { useSelector, useDispatch } from "react-redux"
import MaterialIcon from "../../Common/MaterialIcon/MaterialIcon";
import MenuItem from "../../Common/MenuItem/MenuItem";
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
            <View style={
                [
                    styles.rowLayout,
                    styles.padding,
                    styles.bigGap
                ]
            }>
                <MaterialIcon name="select-all" />
                <Text style={
                    [
                        styles.text,
                        styles.headingText
                    ]
                }>All Tabs</Text>
            </View>
            <View style={{ width: '100%' }}>
                <View style={[styles.divider]} />
                <View
                    style={
                        [
                            styles.rowLayout,
                        ]
                    }>
                    <Pressable
                        style={
                            [
                                styles.rowLayout,
                                styles.wide,
                                styles.padding,
                                styles.bigGap,
                            ]
                        }
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
                    >
                        <MaterialIcon name="tab-unselected" />
                        <Text style={[styles.text]}>Close all</Text>
                    </Pressable>
                    <Pressable
                        style={
                            [
                                styles.rowLayout,
                                styles.wide,
                                styles.padding,
                                styles.bigGap,
                            ]
                        }
                        onPress={() => {
                            dispatch({
                                type: "DELETEOTHERTABS",
                                payload: state.currentTab
                            })
                            dispatch({
                                type: "TABSCONTEXTMENU"
                            })
                        }}
                    >
                        <MaterialIcon name="tab-remove" />
                        <Text style={[styles.text]}>Close others</Text>
                    </Pressable>
                </View>
                {
                    Object.keys(state.tabs).map((index) => {
                        return (
                            <View
                                key={index}
                                style={
                                    [
                                        styles.rowLayout,
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
                <View style={[styles.divider]} />
            </View>
            <View style={
                [
                    styles.wide,
                    styles.padding,
                    {
                        width: '100%'
                    }
                ]
            }>
                <Pressable
                    style={[
                        styles.pill,
                        styles.centered,
                        styles.padding
                    ]}
                    onPress={() => dispatch({
                        type: "ALLTABSMODAL",
                    })}
                >
                    <Text style={[styles.text]}>Close</Text>
                </Pressable>
            </View>
        </View>
    </Modal >
    )
}