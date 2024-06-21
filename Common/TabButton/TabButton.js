import { Text, TouchableOpacity, View, Image, } from "react-native";
import { CombinedReducersContext, CombinedDispatchContext } from "../../Context/Context"
import styles from "../../styles";
import { useContext } from "react";

const TabButton = (props) => {
    const state = useContext(CombinedReducersContext)
    const dispatch = useContext(CombinedDispatchContext)
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
            <Image style={{ height: 15, width: 15 }} source={require('../../assets/folder.png')} />
            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text]}
            >{state.tabs[props.index]["title"]}</Text>
        </TouchableOpacity>
        {
            props.index == state.currentTab ?
                <TouchableOpacity
                    style={[styles.paddingCloseLeft]}
                    onPress={() => { props.deleteCurrTab() }}>
                    <Image style={{ height: 8, width: 8 }} source={require('../../assets/close.png')} />
                </TouchableOpacity>
                : null
        }

    </View >)
}
export default TabButton