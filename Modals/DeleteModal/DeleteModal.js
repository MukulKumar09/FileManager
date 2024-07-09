import { Text, Pressable, View, Modal } from "react-native";
import { useSelector } from "react-redux"
import styles, { backgroundColor } from "../../styles";
import MaterialIcon from "../../Common/MaterialIcon/MaterialIcon";

export default function DeleteModal() {
    const state = {
        deleteModal: useSelector(state => state.deleteModal),
        deletePromiseResolver: useSelector(state => state.deletePromiseResolver),
        clipboardItems: useSelector(state => state.clipboardItems),
        deletePromiseResolver: useSelector(state => state.deletePromiseResolver),
    }
    return (<Modal
        onRequestClose={() => state.deletePromiseResolver(0)}
        visible={state.deleteModal ? true : false}
        transparent={true}
    >
        <Pressable
            onPress={() => state.deletePromiseResolver(0)} style={[styles.modalBackground]}
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
                <MaterialIcon name="delete-outline" />
                <Text style={[
                    styles.text,
                    styles.headingText
                ]}>Delete Item(s)?</Text>
            </View>
            <View style={[styles.divider]} />
            <View style={
                [
                    styles.padding,
                    styles.bigGap
                ]
            }>
                <Text style={[styles.text,
                styles.textDisabled]}>Following items will be deleted:</Text>
                {state.deleteModal.map((item, i) =>
                    <Text key={i} style={[styles.text]}>{item["name"]}</Text>
                )}
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
                    onPressIn={() => {
                        state.deletePromiseResolver(0)
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
                        state.deletePromiseResolver(1)
                    }
                    }
                    style={[styles.pill,
                    styles.centered,
                    styles.pillHighlight,
                    styles.wide,
                    styles.padding]}>
                    <Text style={[styles.text]}>Delete</Text>
                </Pressable>
            </View>
        </View>
    </Modal>)
}