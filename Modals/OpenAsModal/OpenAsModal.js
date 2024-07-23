import { Text, Pressable, View, Modal } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useSelector, useDispatch } from "react-redux";
import styles, { backgroundColor } from "../../styles";
import MaterialIcon from "../../Common/MaterialIcon/MaterialIcon";
import useIcon from "../../Hooks/useIcon";
import { useState } from "react";
import useOpenExternally from "../../Hooks/useOpenExternally";
import MenuItem from "../../Common/MenuItem/MenuItem";

export default function OpenAsModal() {
    const dispatch = useDispatch()
    const state = {
        openAsModal: useSelector(state => state.openAsModal),
        tabCounter: useSelector(state => state.tabCounter),
    }
    const [isExternal, setIsExternal] = useState(0)
    return (
        <Modal
            onRequestClose={() => dispatch({
                type: "OPENASMODAL",
                payload: 0
            })}
            visible={state.openAsModal ? true : false}
            transparent={true}
        >
            <Animated.View
                entering={FadeInDown.duration(50)}
                exiting={FadeOutDown.duration(50)}
                style={[styles.wide]}
            >
                <Pressable
                    onPress={() => dispatch({
                        type: "OPENASMODAL",
                        payload: 0
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
                            {
                                width: '100%',
                                justifyContent: 'space-between'
                            }
                        ]
                    }>
                        <View style={
                            [
                                styles.rowLayout,
                                styles.bigGap,
                            ]
                        }>
                            <MaterialIcon name="file-question-outline" />
                            <View
                                style={[styles.wide]}>
                                <Text style={[
                                    styles.text,
                                    styles.headingText
                                ]}>Open as...</Text>
                                <Text
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                    style={[
                                        styles.text,
                                        styles.textDisabled
                                    ]}>{state.openAsModal["name"]}</Text>
                            </View>
                        </View>
                        {/* <Pressable
                        onPress={() => setIsExternal(!isExternal)}
                        style={
                            [
                                styles.smallPill,
                                isExternal == 1 && styles.pillHighlight,
                            ]
                        }
                    >
                        <Text
                            style={
                                [
                                    styles.text
                                ]
                            }>
                            {isExternal ? "Externally" : "Internally"}
                        </Text>
                    </Pressable> */}
                    </View>
                    <View style={[styles.divider]} />
                    <View style=
                        {
                            [
                                { width: '100%' }
                            ]
                        }>
                        <Pressable
                            onPress={() => {
                                dispatch({
                                    type: "TEXTEDITORMODAL",
                                    payload: state.openAsModal
                                })
                                dispatch({
                                    type: "OPENASMODAL",
                                    payload: 0
                                })
                            }}
                            style={
                                [
                                    styles.rowLayout,
                                    styles.bigGap,
                                    styles.padding
                                ]
                            }>
                            {useIcon("txt")}
                            <Text
                                style={
                                    [
                                        styles.text
                                    ]
                                }>
                                Text
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                dispatch({
                                    type: "SETMEDIABOX",
                                    payload: state.openAsModal
                                })
                                dispatch({
                                    type: "SETMEDIATYPE",
                                    payload: 1
                                })
                                dispatch({
                                    type: "OPENASMODAL",
                                    payload: 0
                                })
                            }}
                            style={
                                [
                                    styles.rowLayout,
                                    styles.bigGap,
                                    styles.padding
                                ]
                            }>
                            {useIcon("png")}
                            <Text style={
                                [
                                    styles.text
                                ]
                            }>
                                Image
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                dispatch({
                                    type: "SETMEDIABOX",
                                    payload: state.openAsModal
                                })
                                dispatch({
                                    type: "SETMEDIATYPE",
                                    payload: 2
                                })
                                dispatch({
                                    type: "OPENASMODAL",
                                    payload: 0
                                })
                            }}
                            style={
                                [
                                    styles.rowLayout,
                                    styles.bigGap,
                                    styles.padding
                                ]
                            }>
                            {useIcon("mp4")}
                            <Text style={
                                [
                                    styles.text
                                ]
                            }>
                                Video
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                dispatch({
                                    type: "SETMEDIABOX",
                                    payload: state.openAsModal
                                })
                                dispatch({
                                    type: "SETMEDIATYPE",
                                    payload: 2
                                })
                                dispatch({
                                    type: "OPENASMODAL",
                                    payload: 0
                                })
                            }}
                            style={
                                [
                                    styles.rowLayout,
                                    styles.bigGap,
                                    styles.padding
                                ]
                            }>
                            {useIcon("mp3")}
                            <Text style={
                                [
                                    styles.text
                                ]
                            }>
                                Audio
                            </Text>
                        </Pressable>
                        <MenuItem
                            functionName={() => {
                                dispatch({
                                    type: "ADDTAB",
                                    payload: {
                                        tabKey: state.tabCounter,
                                        title: "Browser",
                                        path: "file://" + state.openAsModal["path"],
                                        type: "webbrowser",
                                    }
                                })
                                dispatch({
                                    type: "SETCURRENTTAB",
                                    payload: state.tabCounter
                                })
                                dispatch({
                                    type: "INCREASETABCOUNTER",
                                })
                                dispatch({
                                    type: "OPENASMODAL",
                                    payload: 0
                                })
                            }}
                            icon="web"
                            name="Web" />
                    </View>
                </View>
            </Animated.View>
        </Modal>
    )
}