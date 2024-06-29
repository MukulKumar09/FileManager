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
    return (<View style={[
        styles.rowLayout,
        styles.pill,
        props.index == state.currentTab && styles.pillHighlight,
        {
            maxWidth: 200
        }
    ]}>

        <TouchableOpacity
            style={[styles.rowLayout, styles.mediumGap, styles.padding]}
            onPress={() => {
                dispatch({
                    type: "SETCURRENTTAB",
                    payload: props.index
                })
            }}
        >
            <SmallMaterialIcon name="folder" color="#FFC107" />
            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text]}
            >{state.tabs[props.index]["title"]}</Text>
        </TouchableOpacity>
        {
            props.index == state.currentTab ?
                <TouchableOpacity
                    style={[styles.paddingCloseLeft]}
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
                    }}
                >
                    <SmallMaterialIcon name="close" color="#ffffff" />
                </TouchableOpacity>
                : null
        }

    </View >)
}
export default TabButton