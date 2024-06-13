import { Modal, Text, View, TouchableOpacity } from 'react-native';
import styles from "./styles"
function ConfirmDelete(props) {
    return (<Modal
        animationType="fade"
        transparent={true}
        visible={true} >
        <View style={styles.centeredView}>
            <View style={[styles.modalView, { padding: 20, marginHorizontal: 20, }]}>
                <Text style={[styles.text, { color: '#ffffff', paddingHorizontal: 20 }]}> Confirm Delete? </Text>
                <Text style={[styles.padding, styles.text, styles.buttonTextBasic]}>Do you want to delete selected items?</Text>
                <View style={{ flexDirection: 'row', width: '100%', gap: 10 }}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonBasic, styles.padding, { flex: 1, }]}
                        onPress={() => props.setModalType(0)}>
                        <Text style={[styles.text, styles.buttonTextBasic]}> Cancel </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonHighlight, styles.padding, { flex: 1 }]}
                        onPress={() => { props.confirmDelete(), props.setModalType(0) }}>
                        <Text style={[styles.text, styles.buttonTextHighlight]}> Delete </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal >)
}
export default ConfirmDelete