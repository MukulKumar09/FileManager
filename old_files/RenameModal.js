import { TextInput, Modal, Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import styles from "./styles"
import RNFS from 'react-native-fs';
import { useState } from 'react';
const RenameModal = (props) => {
    const [nameVal, setNameVal] = useState(props.selectedItem.name)
    const renameFile = () => {
        // console.log()
        RNFS.moveFile(props.selectedItem.path, props.path + "/" + nameVal)
            .then((success) => {
                ToastAndroid.showWithGravity(
                    'Item Renamed.',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
                let tempFilesList = { ...props.filesList }
                const itemAddress = props.filesList.indexOf(props.selectedItem)
                tempFilesList[itemAddress]["path"] = props.path + "/" + nameVal
                tempFilesList[itemAddress]["name"] = nameVal
                console.log(tempFilesList)
                console.log({
                    ...props.filesList,
                    [props.filesList[itemAddress]]: {
                        ...props.filesList[itemAddress],
                        "path": props.path + "/" + nameVal,
                        "name": nameVal
                    }

                })
                props.setModalType(0)
            }).catch((err) => {
                let message = (err.message).replace(props.selectedItem.path, "")
                ToastAndroid.showWithGravity(
                    "Rename Failed: " + message,
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                );
                // props.setModalType(0)
            });
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={true}>
            <View style={styles.centeredView}>
                <View style={[styles.modalView, { padding: 20, marginHorizontal: 20, }]}>
                    <Text style={[styles.text, { color: '#ffffff', paddingHorizontal: 20 }]}>Rename</Text>
                    <TextInput
                        multiline
                        style={[styles.inputField, styles.buttonBasic, styles.padding, styles.text, styles.buttonTextBasic]}
                        defaultValue={nameVal}
                        onChangeText={(rename) => setNameVal(rename)}
                    />
                    <View style={{ flexDirection: 'row', width: '100%', gap: 10 }}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonBasic, styles.padding, { flex: 1, }]}
                            onPress={() => props.setModalType(0)}>
                            <Text style={[styles.text, styles.buttonTextBasic]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={nameVal == props.selectedItem.name ? true : false}
                            style={[styles.button, styles.buttonHighlight, styles.padding, { flex: 1 }]}
                            onPress={() => renameFile()}>
                            <Text style={[styles.text, styles.buttonTextHighlight]}>Rename</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
    );
};

export default RenameModal;