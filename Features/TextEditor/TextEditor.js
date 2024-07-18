import { useEffect, useRef, useState } from "react";
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import RNFS from 'react-native-fs';
import { useSelector, useDispatch } from "react-redux";
import styles, { backgroundColor, grey, secondaryColor } from "../../styles";
import { Keyboard, Pressable, Text, TextInput, View } from "react-native";
import MaterialIcon from "../../Common/MaterialIcon/MaterialIcon";

export default function TextEditor() {
    const dispatch = useDispatch()
    const state = {
        textEditorModal: useSelector(state => state.textEditorModal),
    }
    const [text, setText] = useState("")
    const [isEdited, setIsEdited] = useState(0)
    const [keyboard, setKeyboard] = useState(0)
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
        setIsEdited(0)
        dispatch({
            type: "TOAST",
            payload:
                "File Saved.",
        })
    }

    const closeEditor = async () => {
        textEditorRef.current.blur()
        if (isEdited) {
            dispatch({
                type: "TEXTEDITORUNSAVEDMODAL"
            })
            let decision = await new Promise((resolve) => {
                dispatch({
                    type: "TEXTEDITORUNSAVEDPROMISE",
                    payload: resolve
                })
            })
            switch (decision) {
                case 1: {
                    dispatch({
                        type: "TOAST",
                        payload:
                            "Changes not saved.",
                    })
                    dispatch({
                        type: "TEXTEDITORMODAL",
                        payload: 0
                    })
                    break
                }
                case 2: {
                    await saveFile()
                    dispatch({
                        type: "TEXTEDITORMODAL",
                        payload: 0
                    })
                    break
                }
            }
            dispatch({
                type: "TEXTEDITORUNSAVEDMODAL"
            })
        } else {
            dispatch({
                type: "TEXTEDITORMODAL",
                payload: 0
            })
        }
    }

    return (
        <Animated.View
            entering={FadeInDown.duration(100)}
            exiting={FadeOutDown.duration(100)}
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
                onChangeText={(text) => {
                    setIsEdited(1)
                    setText(text)
                }}
                multiline={true}
                showSoftInputOnFocus={keyboard ? true : false}
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
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={
                        [
                            styles.text,
                            styles.wide,
                            { padding: 15 }
                        ]
                    }>{isEdited == 1 && "*"}{state.textEditorModal["name"]}</Text>
                <View style={
                    [
                        styles.rowLayout
                    ]
                }>
                    <Pressable
                        onPress={() => {
                            keyboard == 1 && Keyboard.dismiss()
                            setKeyboard(!keyboard)
                            dispatch({
                                type: "TOAST",
                                payload: "Virtual Keyboard " + (keyboard ? "Disabled" : "Enabled")
                            })
                        }}
                        style={
                            { padding: 15 }
                        }>
                        <MaterialIcon name="keyboard-outline" color={keyboard ? "white" : grey} />
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            saveFile()
                        }}
                        style={
                            { padding: 15 }
                        }>
                        <MaterialIcon name="content-save-outline" color="white" />
                    </Pressable>
                    <Pressable onPress={() => closeEditor()}

                        style={
                            { padding: 15 }
                        }>
                        <MaterialIcon name="close" color="white" />
                    </Pressable>
                </View>
            </View>
        </Animated.View>
    )
}