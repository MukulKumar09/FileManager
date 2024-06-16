import { Text, TouchableOpacity, View, Image, } from "react-native";
import styles from "./styles";

const TabButton = (props) => {
    return (<View style={[
        styles.rowLayout,
        styles.pill,
        props.index == props.currTab && styles.pillHighlight
    ]}>

        <TouchableOpacity
            style={[styles.rowLayout, styles.mediumGap, styles.padding]}
            onPress={() => props.setCurrTab(props.index)}>
            <Image style={{ height: 15, width: 15 }} source={require('./assets/folder.png')} />
            <Text style={[styles.text]}
            >{props.tabData["title"]}</Text>
        </TouchableOpacity>
        {props.index == props.currTab ?
            <TouchableOpacity
                style={[styles.paddingCloseLeft]}
                onPress={() => { props.deleteTab() }}>
                <Image style={{ height: 8, width: 8 }} source={require('./assets/close.png')} />
            </TouchableOpacity>
            : null}

    </View>)
}
export default TabButton