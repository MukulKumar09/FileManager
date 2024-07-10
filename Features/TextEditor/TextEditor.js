import styles, { backgroundColor, secondaryColor } from "../../styles";
import { useEffect, useRef, useState } from "react";
import RNFS, { write } from 'react-native-fs';
import { useSelector, useDispatch } from "react-redux";
import { Keyboard, Pressable, Text, TextInput, View } from "react-native";
import MaterialIcon from "../../Common/MaterialIcon/MaterialIcon";

export default function TextEditor() {
    const dispatch = useDispatch()
    const state = {
        textEditorModal: useSelector(state => state.textEditorModal),
    }
    const [text, setText] = useState("")
    const [editable, setEditable] = useState(0)
    const textEditorRef = useRef("")

    useEffect(() => {
        const readFileAsync = async () => {
            setText(await RNFS.readFile(state.textEditorModal["path"]))
        }
        readFileAsync()
    }, [])

    const saveFile = async () => {
        // textEditorRef.current.blur()
        await RNFS.writeFile(state.textEditorModal["path"], text)
        dispatch({
            type: "TOAST",
            payload:
                "File Saved.",
        })
    }

    return (
        <View
            style={{
                position: 'absolute',
                zIndex: 2,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundColor: backgroundColor
            }}>
            <TextInput
                value={text}
                ref={textEditorRef}
                onChangeText={(text) => setText(text)}
                multiline={true}
                editable={editable ? true : false}
                style={
                    [
                        styles.wide,
                        {
                            textAlignVertical: 'top'
                        }
                    ]
                }
            />
            <View style={
                [
                    styles.rowLayout,
                    {
                        backgroundColor: secondaryColor,
                        justifyContent: 'space-between'
                    }
                ]
            }>
                <Text style={
                    [
                        styles.text,
                        styles.padding
                    ]
                }>{state.textEditorModal["name"]}</Text>
                <View style={
                    [
                        styles.rowLayout
                    ]
                }>
                    <Pressable
                        onPress={() => {
                            setEditable(!editable)
                        }}
                        style={
                            [
                                styles.padding
                            ]
                        }>
                        <MaterialIcon name="pencil-outline" color="white" />
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            saveFile()
                        }}
                        style={
                            [
                                styles.padding
                            ]
                        }>
                        <MaterialIcon name="content-save-outline" color="white" />
                    </Pressable>
                    <Pressable onPress={() => dispatch({
                        type: "TEXTEDITORMODAL",
                        payload: 0
                    })}

                        style={
                            [
                                styles.padding
                            ]
                        }>
                        <MaterialIcon name="close" color="white" />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}