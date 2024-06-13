import { useState, useImperativeHandle, forwardRef, } from "react";
import { Text, TouchableOpacity, View, Image, } from "react-native";
import styles from "./styles";

const TabButton = forwardRef((props, ref) => {
    const [rerend, setRerend] = useState(0)
    useImperativeHandle(ref, () => ({
        rerender: () => {
            console.log(props.tabNames)
            setRerend(!rerend)
        }
    }));
    return (<View style={[
        styles.rowLayout,
        styles.pill,
        //props.currTabStatic.current == props.index && styles.pillHighlight
        props.tabVisible[props.index] && styles.pillHighlight
    ]}>

        <TouchableOpacity
            style={[styles.rowLayout, styles.mediumGap, styles.padding]}
            onPress={() => {

                // props.buttonRefs.current[props.currTabStatic.current].rerender() //call setRender of previous tab
                props.prevWindow.rerender("none")
                props.selfWindow.rerender("flex")
                let tempTabsVisible = [...props.tabVisible]
                tempTabsVisible[props.currTabStatic.current] = 0

                props.currTabStatic.current = props.index

                tempTabsVisible[props.currTabStatic.current] = 1
                props.setTabVisible(tempTabsVisible)
                // setRerend(1)
            }}>
            <Image style={{ height: 15, width: 15 }} source={require('./assets/folder.png')} />
            <Text style={[styles.text]}
            >{props.tabName}</Text>
        </TouchableOpacity>
        {props.currTabStatic.current == props.index ?
            <TouchableOpacity
                style={[styles.paddingCloseLeft]}
                onPress={() => { props.deleteTab() }}>
                <Image style={{ height: 8, width: 8 }} source={require('./assets/close.png')} />
            </TouchableOpacity>
            : null}

    </View>)
})
export default TabButton