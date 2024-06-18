import { Text, TouchableOpacity, View, Image, } from "react-native";
import styles from "../../styles";

const TabButton = (props) => {
    return (<View style={[
        styles.rowLayout,
        styles.pill,
        props.index == props.currTab && styles.pillHighlight,
        {
            maxWidth: 200
        }
    ]}>

        <TouchableOpacity
            style={[styles.rowLayout, styles.mediumGap, styles.padding]}
            onPress={() => {
                props.setCurrTab(props.index)
                props.currTabStatic.current = props.index
            }
            }
        >
            <Image style={{ height: 15, width: 15 }} source={require('../../assets/folder.png')} />
            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text]}
            >{props.tabData["title"]}</Text>
        </TouchableOpacity>
        {
            props.index == props.currTab ?
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