import { Text, TouchableOpacity, View, Image, } from "react-native";
import { useSelector, useDispatch } from "react-redux"
import styles from "../../styles";
import SmallMaterialIcon from "../SmallMaterialIcon/SmallMaterialIcon";

const TabButton = (props) => {
    const dispatch = useDispatch()
    const state = {
        tabs: useSelector(state => state.tabs),
        currentTab: useSelector(state => state.currentTab),
    }
    return (
        <View style={[
            styles.rowLayout,
            styles.pill,
            styles.padding,
            styles.mediumGap,
            props.index == state.currentTab && styles.pillHighlight
        ]}>

            <TouchableOpacity
                onPress={() => {
                    dispatch({
                        type: "SETCURRENTTAB",
                        payload: props.index
                    })
                }}
                style={
                    [
                        styles.rowLayout,
                        styles.mediumGap,
                        {
                            maxWidth: 150
                        }
                    ]
                }
            >
                <SmallMaterialIcon
                    name="folder"
                    color="#FFC107"
                />
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[
                        styles.text
                    ]}
                >
                    {state.tabs[props.index]["title"]}
                </Text>
            </TouchableOpacity>
            {
                props.index == state.currentTab ?
                    <TouchableOpacity
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
                    >
                        <SmallMaterialIcon
                            name="close"
                            color="#ffffff"
                        />
                    </TouchableOpacity>
                    : null
            }

        </View >)
}
export default TabButton