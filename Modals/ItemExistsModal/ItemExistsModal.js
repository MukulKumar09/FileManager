import { Text, Pressable, View, Modal } from "react-native";
import { useSelector, useDispatch } from "react-redux"
import styles, { backgroundColor } from "../../styles";

export default function ItemExistsModal() {

    const dispatch = useDispatch()
    const state = {
        itemExistsModal: useSelector(state => state.itemExistsModal),
        itemExistsPromiseResolver: useSelector(state => state.itemExistsPromiseResolver),
        itemInOperation: useSelector(state => state.itemInOperation),
    }
    return (
        <Modal
            visible={state.itemExistsModal}
            onRequestClose={() => state.itemExistsPromiseResolver(0)}
            transparent={true}
        >
            <Pressable
                onPress={() => {
                    state.itemExistsPromiseResolver(0)
                }}
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
                <View style={[styles.padding]}>
                    <Text style={[styles.text,
                    styles.headingText]}>Item Already Exists!</Text>
                </View>
                <View style={[styles.divider]} />
                <View style={[styles.padding]}>
                    <Text style={[styles.text]}>{state.itemInOperation} already exists in destination.</Text>
                </View>
                <View style={[styles.divider]} />
                <View style={
                    [
                        styles.rowLayout,
                        styles.mediumGap,
                        styles.padding
                    ]
                }>
                    <Pressable
                        style={
                            [
                                styles.pill,
                                styles.wide,
                                styles.centered,
                                styles.padding
                            ]
                        }
                        onPressIn={() => {
                            state.itemExistsPromiseResolver(1)
                        }}
                    >
                        <Text style={[styles.text]}>Force</Text>
                    </Pressable>
                    <Pressable
                        style={
                            [
                                styles.pill,
                                styles.wide,
                                styles.centered,
                                styles.padding
                            ]
                        }
                        onPressIn={() => {
                            state.itemExistsPromiseResolver(0)
                        }
                        }
                    >
                        <Text style={[styles.text]}>Skip</Text>
                    </Pressable>
                    <Pressable
                        style={
                            [
                                styles.pill,
                                styles.pillHighlight,
                                styles.wide,
                                styles.padding,
                                styles.centered,
                            ]
                        }
                        onPressIn={async () => {
                            let updatedName
                            dispatch({
                                type: "INPUTMODAL",
                                payload: "Existing Item"
                            })
                            updatedName = await new Promise((resolve) => {
                                dispatch({
                                    type: "INPUTPROMISERESOLVER",
                                    payload: resolve
                                })
                            })
                            dispatch({
                                type: "INPUTMODAL",
                                payload: 0
                            })
                            state.itemExistsPromiseResolver(updatedName)
                        }
                        }
                    >
                        <Text style={[styles.text]}>Rename</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}