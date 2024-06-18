import { Text, Pressable, View, Modal, TextInput } from "react-native";
import styles, { backgroundColor } from "../../styles";

export default function InputModal(props) {
    return (<Modal
        transparent={true}
        onShow={() => {
            this.textInput.blur();
            this.textInput.focus();
        }}
    >
        <Pressable
            onPressIn={() => setInputModal(0)}
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
                New {inputModal}
            </Text>
            <View style={[styles.divider]} />
            {alreadyExists ? <Text style={[styles.text,
            styles.smallText]}>Already exists!</Text> : null}
            <View style={[styles.rowLayout,
            styles.pill,
            styles.input]}>
                <TextInput
                    ref={input => { this.textInput = input; }}
                    autoFocus={true}
                    style={[styles.text,
                    styles.wide]}
                    multiline={true}
                    defaultValue={nameNewItem.current}
                    onChangeText={text => {
                        for (let i = 0; i < mainCache[tabs[currTab]["path"]].length; i++) {
                            if (mainCache[tabs[currTab]["path"]][i]["name"] == text) {
                                setAlreadyExists(1)
                                break
                            } else {
                                setAlreadyExists(0)
                                nameNewItem.current = text
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
                        nameNewItem.current = ""
                        setInputModal(0)
                    }
                    }
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
                        inputRef.current.resolve(nameNewItem.current)
                    }
                    }
                    style={[styles.pill,
                    styles.centered,
                    styles.pillHighlight,
                    styles.wide,
                    styles.padding]}>
                    <Text style={[styles.text, alreadyExists ? styles.textDisabled : null]}>Done</Text>
                </Pressable>
            </View>
        </View>
    </Modal>)
}