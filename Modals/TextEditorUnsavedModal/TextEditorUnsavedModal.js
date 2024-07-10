import { Text, Pressable, View, Modal } from "react-native";
import { useSelector } from "react-redux"
import styles, { backgroundColor } from "../../styles";
import MaterialIcon from "../../Common/MaterialIcon/MaterialIcon";

export default function TextEditorUnsavedModal() {
    const state = {
        textEditorUnsavedModal: useSelector(state => state.textEditorUnsavedModal),
        textEditorUnsavedPromiseResolver: useSelector(state => state.textEditorUnsavedPromiseResolver),
    }
    return (<Modal
        onRequestClose={() => state.textEditorUnsavedPromiseResolver(0)}
        visible={state.textEditorUnsavedModal ? true : false}
        transparent={true}
    >
        <Pressable
            onPress={() => state.textEditorUnsavedPromiseResolver(0)} style={[styles.modalBackground]}
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
                <MaterialIcon name="alert-circle-outline" />
                <Text style={[
                    styles.text,
                    styles.headingText
                ]}>Changes Unsaved!</Text>
            </View>
            <View style={[styles.divider]} />
            <View style={
                [
                    styles.padding,
                    styles.bigGap
                ]
            }>
                <Text style={[styles.text,
                styles.textDisabled]}>Changes made are not saved</Text>
            </View>
            <View style={[styles.divider]} />
            <View style={
                [
                    styles.rowLayout,
                    styles.padding,
                    styles.mediumGap
                ]
            }>
                <Pressable
                    onPressIn={() => {
                        state.textEditorUnsavedPromiseResolver(0)
                    }
                    }
                    style={[styles.pill,
                    styles.centered,
                    styles.wide,
                    styles.padding]}>
                    <Text style={[styles.text]}>Cancel</Text>
                </Pressable>
                <Pressable
                    onPressIn={() => {
                        state.textEditorUnsavedPromiseResolver(1)
                    }
                    }
                    style={[styles.pill,
                    styles.centered,
                    styles.wide,
                    styles.padding]}>
                    <Text style={[styles.text]}>Ignore</Text>
                </Pressable>
                <Pressable
                    onPressIn={() => {
                        state.textEditorUnsavedPromiseResolver(2)
                    }
                    }
                    style={[styles.pill,
                    styles.centered,
                    styles.pillHighlight,
                    styles.wide,
                    styles.padding]}>
                    <Text style={[styles.text]}>Save</Text>
                </Pressable>
            </View>
        </View>
    </Modal>)
}