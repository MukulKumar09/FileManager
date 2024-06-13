import { TextInput, Modal, Text, View, TouchableOpacity, ToastAndroid, Switch } from 'react-native';
import styles from "./styles"
const SearchModal = (props) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={true}>
            <View style={styles.centeredView}>
                <View style={[styles.modalView, { padding: 20, marginHorizontal: 20, }]}>
                    <Text style={[styles.text, { color: '#ffffff', paddingHorizontal: 20 }]}>Search item</Text>
                    <TextInput
                        multiline
                        style={[styles.inputField, styles.buttonBasic, styles.padding, styles.text, styles.buttonTextBasic]}
                        defaultValue={props.searchTerm}
                        onChangeText={(searchVal) => props.setSearchTerm(searchVal)}
                    />
                    <View style={[styles.padding, { justifyContent: 'space-between', flexDirection: 'row' }]}>
                        <Text style={[styles.text, styles.buttonTextHighlight]}>In Subfolders</Text>
                        <Switch />
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', gap: 10 }}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonBasic, styles.padding, { flex: 1, }]}
                            onPress={() => props.setModalType(0)}>
                            <Text style={[styles.text, styles.buttonTextBasic]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonHighlight, styles.padding, { flex: 1 }]}
                            onPress={() => { props.handleSearch(), props.setModalType(0) }}>
                            <Text style={[styles.text, styles.buttonTextHighlight]}>Search</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
    );
};

export default SearchModal;