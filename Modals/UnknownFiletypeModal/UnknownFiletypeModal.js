import { Text, Pressable, View, Modal } from "react-native";
import { useSelector, useDispatch } from "react-redux"
import styles, { backgroundColor } from "../../styles";
import MaterialIcon from "../../Common/MaterialIcon/MaterialIcon";
import MenuItem from "../../Common/MenuItem/MenuItem";
import useIcon from "../../Hooks/useIcon";
import { useState } from "react";

export default function UnknownFiletypeModal() {
    const dispatch = useDispatch()
    const state = {
        unknownFiletypeModal: useSelector(state => state.unknownFiletypeModal),
    }
    const [isExternal, setIsExternal] = useState(0)
    return (
        <Modal
            onRequestClose={() => dispatch({
                type: "UNKNOWNFILETYPEMODAL",
                payload: 0
            })}
            visible={state.unknownFiletypeModal ? true : false}
            transparent={true}
        >
            <Pressable
                onPress={() => dispatch({
                    type: "UNKNOWNFILETYPEMODAL",
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
                        styles.bigGap
                    ]
                }>
                    <MaterialIcon name="file-question-outline" />
                    <Text style={[
                        styles.text,
                        styles.headingText
                    ]}>Open as...</Text>
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
                                payload: state.unknownFiletypeModal
                            })
                            dispatch({
                                type: "UNKNOWNFILETYPEMODAL",
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
                        <Text style={
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
                                payload: state.unknownFiletypeModal
                            })
                            dispatch({
                                type: "SETMEDIATYPE",
                                payload: 1
                            })
                            dispatch({
                                type: "UNKNOWNFILETYPEMODAL",
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
                                payload: state.unknownFiletypeModal
                            })
                            dispatch({
                                type: "SETMEDIATYPE",
                                payload: 2
                            })
                            dispatch({
                                type: "UNKNOWNFILETYPEMODAL",
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
                                payload: state.unknownFiletypeModal
                            })
                            dispatch({
                                type: "SETMEDIATYPE",
                                payload: 2
                            })
                            dispatch({
                                type: "UNKNOWNFILETYPEMODAL",
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
                    {/* <MenuItem
                        functionName={() => {

                        }}
                        icon="file-move-outline"
                        name="Other" /> */}
                </View>
            </View>
        </Modal>)
}