import { TextInput, Modal, Text, View, TouchableOpacity, ToastAndroid, ProgressBarAndroid } from 'react-native';
import styles from "./styles"
const ProgressModal = (props) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={true}>
            <View style={styles.centeredView}>
                <View style={[styles.modalView, { padding: 20, marginHorizontal: 20, }]}>
                    <Text style={[styles.text, { color: '#ffffff', paddingHorizontal: 20 }]}>Copy Progress</Text>
                    <View>
                        <View
                            style={[styles.button, styles.buttonHighlight, styles.padding, { width: props.progressPercent + '%' }]}
                        ><Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text, styles.buttonTextBasic]}>{props.progressPercent}%</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', gap: 10 }}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonBasic, styles.padding, { flex: 1, }]}>
                            <Text style={[styles.text, styles.buttonTextBasic]}>Cancel</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            style={[styles.button, styles.buttonHighlight, styles.padding, { flex: 1 }]}>
                            <Text style={[styles.text, styles.buttonTextHighlight]}>Rename</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </View>
        </Modal >
    );
};

export default ProgressModal;