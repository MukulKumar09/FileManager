import { Text, Pressable, View, Modal, TextInput } from "react-native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import styles, { backgroundColor } from "../../styles";

export default function InputModal() {
    const [alreadyExists, setAlreadyExists] = useState(0)
    const dispatch = useDispatch()
    const state = {
        inputModal: useSelector(state => state.inputModal),
        tabs: useSelector(state => state.tabs),
        cache: useSelector(state => state.cache),
        inputModal: useSelector(state => state.inputModal),
        itemInOperation: useSelector(state => state.itemInOperation),
        currentTab: useSelector(state => state.currentTab),
        inputPromiseResolver: useSelector(state => state.inputPromiseResolver),
    }
    let newName;
    const inputModal = (payload) => dispatch({
        type: "INPUTMODAL",
        payload: payload
    })
    return (
        <Modal
            onRequestClose={() => inputModal(0)}
            transparent={true}
            onShow={() => {
                this.textInput.blur();
                this.textInput.focus();
            }}
        >
            <Pressable
                onPress={() => inputModal(0)}
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
                <View style={[
                    styles.padding,]}>
                    <Text style={[styles.text,
                    styles.headingText]}>
                        New Name for {state.inputModal}
                    </Text>
                </View>
                <View style={[styles.divider]} />
                <View style={
                    [
                        styles.padding,
                        { width: '100%' }
                    ]
                }>
                    {alreadyExists ? <Text style={[styles.text,
                    styles.smallText]}>Already exists!</Text> : null}
                    <View style={
                        [
                            styles.rowLayout,
                            styles.pill,
                            styles.wide,
                            styles.input,
                            styles.bordered
                        ]
                    }>
                        <TextInput
                            ref={input => { this.textInput = input; }}
                            autoFocus={true}
                            style={[
                                styles.text,
                                styles.wide
                            ]}
                            multiline={true}
                            defaultValue={state.itemInOperation["name"]}
                            onChangeText={text => {
                                for (let i = 0; i < state.cache[state.tabs[state.currentTab]["path"]].length; i++) {
                                    if (text == state.itemInOperation || state.cache[state.tabs[state.currentTab]["path"]][i]["name"] == text) {
                                        setAlreadyExists(1)
                                        break
                                    } else {
                                        setAlreadyExists(0)
                                        newName = text
                                    }
                                }
                            }
                            }
                        />
                    </View>
                </View>
                <View style={[styles.divider]} />
                <View style={
                    [
                        styles.rowLayout,
                        styles.padding,
                        styles.bigGap
                    ]
                }>
                    <Pressable
                        onPressIn={() => inputModal(0)}
                        style={[
                            styles.pill,
                            styles.wide,
                            styles.centered,
                            styles.padding]}>
                        <Text style={[styles.text]}>Cancel</Text>
                    </Pressable>
                    <Pressable
                        disabled={alreadyExists ? true : false}
                        onPressIn={() => {
                            state.inputPromiseResolver(newName)
                        }
                        }
                        style={[styles.pill,
                        styles.centered,
                        styles.pillHighlight,
                        styles.wide,
                        styles.padding]}>
                        <Text style={[
                            styles.text,
                            alreadyExists ? styles.textDisabled : null
                        ]}>Done</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}