import { Text, Pressable, View, Modal } from "react-native";
import styles, { backgroundColor } from "../../styles";

export default function ItemExistsModal(props) {
    return (
        <Modal
            transparent={true}
        >
            <Pressable
                onPressIn={() => {
                    props.decisionRef.current.resolve(1);
                    props.setItemExistsModal(0)
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
                <Text style={[styles.text]}>{props.nameNewItem.current} already exists in destination.</Text>
                <View style={[styles.mediumGap, { flexDirection: 'column', marginTop: 30, width: '100%' }]}>
                    <Pressable
                        style={[styles.pill,
                        styles.centered,
                        styles.pillHighlight,
                        styles.padding]}
                        onPressIn={async () => {
                            props.setInputModal("Rename")
                            await new Promise((resolve) => {
                                props.inputRef.current = { resolve }
                            })
                            props.decisionRef.current.resolve(2);
                            props.setItemExistsModal(0)
                            props.setInputModal(0)
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
                            props.decisionRef.current.resolve(0);
                            props.setItemExistsModal(0)
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
                            props.decisionRef.current.resolve(1);
                            props.setItemExistsModal(0)
                        }}
                    >
                        <Text style={[styles.text]}>Overwrite</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}