import { Text, TouchableOpacity, View, Image, } from "react-native";
import { useSelector, useDispatch } from "react-redux"
import styles from "../../styles";
import MaterialIcon from "../MaterialIcon/MaterialIcon";

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
            }
            }
        >
            <MaterialIcon iconName="folder" />
            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text]}
            >{state.tabs[props.index]["title"]}</Text>
        </TouchableOpacity>
        {
            props.index == state.currentTab ?
                <TouchableOpacity
                    style={[styles.paddingCloseLeft]}
                    onPress={() => { props.deleteCurrTab() }}>
                    <MaterialIcon iconName="close" />
                </TouchableOpacity>
                : null
        }

    </View >)
}
export default TabButton