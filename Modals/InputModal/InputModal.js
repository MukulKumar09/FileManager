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
            onPressIn={() => props.setInputModal(0)}
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
                New {props.inputModal}
            </Text>
            <View style={[styles.divider]} />
            {props.alreadyExists ? <Text style={[styles.text,
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
                    defaultValue={props.nameNewItem}
                    onChangeText={text => {
                        for (let i = 0; i < props.cache.length; i++) {
                            if (props.cache[i]["name"] == text) {
                                props.alreadyExists(1)
                                break
                            } else {
                                props.alreadyExists(0)
                                props.nameNewItem = text
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
                        props.nameNewItem = ""
                        props.setInputModal(0)
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
                    disabled={props.alreadyExists ? true : false}
                    onPressIn={() => {
                        props.inputRef.resolve(props.nameNewItem)
                    }
                    }
                    style={[styles.pill,
                    styles.centered,
                    styles.pillHighlight,
                    styles.wide,
                    styles.padding]}>
                    <Text style={[
                        styles.text,
                        props.alreadyExists ? styles.textDisabled : null
                    ]}>Done</Text>
                </Pressable>
            </View>
        </View>
    </Modal>)
}