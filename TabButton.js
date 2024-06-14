import { useState, useImperativeHandle, forwardRef, } from "react";
import { Text, TouchableOpacity, View, Image, } from "react-native";
import styles from "./styles";

const TabButton = forwardRef((props, ref) => {
    // console.log("tab button rerender")
    const [rerend, setRerend] = useState(0)
    const [tabName, setTabName] = useState("")
    useImperativeHandle(ref, () => ({
        rerender: () => {
            setRerend(!rerend)
        },
        tabName: (name) => {
            setTabName(name)
        }
    }));
    return (<View style={[
        styles.rowLayout,
        styles.pill,
        //props.currTabStatic.current == props.index && styles.pillHighlight
        rerend && styles.pillHighlight
    ]}>

        <TouchableOpacity
            style={[styles.rowLayout, styles.mediumGap, styles.padding]}
            onPress={() => {
                props.changeTab(props.index)
                setRerend(!rerend)
            }
            }>
            <Image style={{ height: 15, width: 15 }} source={require('./assets/folder.png')} />
            <Text style={[styles.text]}
            >{tabName}</Text>
        </TouchableOpacity>
        {rerend ?
            <TouchableOpacity
                style={[styles.paddingCloseLeft]}
                onPress={() => { props.deleteTab() }}>
                <Image style={{ height: 8, width: 8 }} source={require('./assets/close.png')} />
            </TouchableOpacity>
            : null}

    </View>)
})
export default TabButton