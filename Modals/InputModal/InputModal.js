import { Text, Pressable, View, Modal, TextInput } from "react-native";
import { useContext, useState } from "react";
import { CombinedReducersContext, CombinedDispatchContext } from "../../Context/Context"
import styles, { backgroundColor } from "../../styles";

export default function InputModal(props) {
    const [alreadyExists, setAlreadyExists] = useState(0)
    const state = useContext(CombinedReducersContext)
    const dispatch = useContext(CombinedDispatchContext)
    let newName
    return (<Modal
        transparent={true}
        onShow={() => {
            this.textInput.blur();
            this.textInput.focus();
        }}
    >
        <Pressable
            onPressIn={() => dispatch({
                type: "INPUTMODAL",
                payload: 0
            })}
            style={[styles.modalBackground]}
        />

        <View style={[
            styles.pill,
            styles.modal,
            styles.bigGap,
            styles.padding,
            {
                backgroundColor: backgroundColor,
                position: 'absolute',
                left: 10,
                right: 10,
                bottom: 10,
            }
        ]}>
            <Text style={[styles.text,
            styles.headingText]}>
                New Name for {state.inputModal}
            </Text>
            <View style={[styles.divider]} />
            {alreadyExists ? <Text style={[styles.text,
            styles.smallText]}>Already exists!</Text> : null}
            <View style={[styles.rowLayout,
            styles.pill,
            styles.input,
            styles.bordered]}>
                <TextInput
                    ref={input => { this.textInput = input; }}
                    autoFocus={true}
                    style={[
                        styles.text,
                        styles.wide
                    ]}
                    multiline={true}
                    defaultValue={state.itemInOperation}
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
            <View style={[styles.rowLayout,
            styles.bigGap]}>
                <Pressable
                    onPressIn={() => {
                        dispatch({
                            type: "INPUTMODAL",
                            payload: 0
                        })
                    }}
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
    </Modal>)
}