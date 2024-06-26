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
            onRequestClose={() => state.itemExistsPromiseResolver(0)}
            visible={state.itemExistsModal}
            transparent={true}
        >
            <Pressable
                onPressIn={() => {
                    state.itemExistsPromiseResolver(0)
                }}
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
                styles.headingText]}>Item Exists!</Text>
                <View style={[styles.divider]} />
                <Text style={[styles.text]}>{state.itemInOperation} already exists in destination.</Text>
                <View style={[styles.mediumGap, { flexDirection: 'column', marginTop: 30, width: '100%' }]}>
                    <Pressable
                        style={[styles.pill,
                        styles.centered,
                        styles.pillHighlight,
                        styles.padding]}
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
                            dispatch({
                                type: "ITEMEXISTSMODAL"
                            })
                            state.itemExistsPromiseResolver(updatedName)
                        }
                        }
                    >
                        <Text style={[styles.text]}>Rename</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.pill,
                        styles.centered,
                        styles.padding]}
                        onPressIn={() => {
                            state.itemExistsPromiseResolver(0)
                        }
                        }
                    >
                        <Text style={[styles.text]}>Skip</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.pill,
                        styles.centered,
                        styles.padding]}
                        onPressIn={() => {
                            state.itemExistsPromiseResolver(1)
                        }}
                    >
                        <Text style={[styles.text]}>Overwrite</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}