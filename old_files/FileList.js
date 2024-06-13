import { useEffect, useRef, useState } from "react";
import { BackHandler, StyleSheet, Modal, Button, FlatList, Image, Text, TouchableOpacity, Dimensions, View, Pressable } from "react-native";
import RNFS from 'react-native-fs';
import Video from 'react-native-video';


function FileList(props) {

    const [modalVisible, setModalVisible] = useState(false);
    const [filesList, setFilesList] = useState()
    const [isSelected, setIsSelected] = useState(0);
    const [itemSelected, setItemSelected] = useState([])
    const [mediaType, setMediaType] = useState(0)
    useEffect(() => {
        const loadFiles = async () => {
            setFilesList(await props.loadFiles(props.route['path']))
        }
        loadFiles()
        const backAction = () => {
            if (props.tabNo === props.route.key && props.route.path !== RNFS.ExternalStorageDirectoryPath) {
                navigateUp();
                return true; // Prevent default behavior (exit the app)
            }
            return false; // Default behavior (exit the app)
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [props.route['path']]);

    const handleFilePress = (file) => {
        setItemSelected(file)
        if (file.isDirectory()) {
            setMediaType(0)
            const parts = file.path.split("/");
            const folderName = parts[parts.length - 1];
            let tempRoutes = [...props.routes]
            let findIdx = tempRoutes.findIndex(obj => obj.key == props.route.key)
            tempRoutes[findIdx]["path"] = file.path
            tempRoutes[findIdx]["title"] = file.path == RNFS.ExternalStorageDirectoryPath ? "Internal Storage" : folderName
            props.setRoutes(tempRoutes)
            props.setCurrentPath(file.path)
        } else {
            const parts = file.name.split(".")
            const ext = parts[parts.length - 1]
            if (["jpeg", "png", "jpg", "gif"].includes(ext)) {
                setMediaType(1)
            }
            else if (["mp4", "mp3"].includes(ext)) {
                setMediaType(2)
            } else {
                setMediaType(0)
            }
        }
    };
    const selectItem = (item) => {
        setMediaType(0)
        setIsSelected(1)
        let tempRoutes = [...props.routes]
        if (tempRoutes[props.index]["selectedItems"].includes(item)) {
            tempRoutes[props.index]["selectedItems"] = tempRoutes[props.index]["selectedItems"].filter((p) => p.path !== item.path)
            if (tempRoutes[props.index]["selectedItems"].length == 0) {
                setIsSelected(0)
                setItemSelected([])
            } else {
                setItemSelected(tempRoutes[props.index]["selectedItems"][tempRoutes[props.index]["selectedItems"].length - 1])
            }
        } else {
            setItemSelected(item)
            tempRoutes[props.index]["selectedItems"].push(item)
        }
        props.setRoutes(tempRoutes)
    }
    const selectRange = (item) => {
        let prevSelIdx = filesList.findIndex(obj => obj.path == itemSelected.path)
        setItemSelected(item)
        // console.log(props.routes[props.index]["selectedItems"].findIndex(obj => obj.path == itemSelected.path))
        let currSelIdx = filesList.findIndex(obj => obj.path == item.path)
        let tempRoutes = [...props.routes]
        if (prevSelIdx > currSelIdx) {
            for (let i = currSelIdx; i <= prevSelIdx - 1; i++) { //select updwards

                if (!tempRoutes[props.index]["selectedItems"].includes(filesList[i])) {
                    tempRoutes[props.index]["selectedItems"].push(filesList[i])
                }
            }
            props.setRoutes(tempRoutes)
        } else if (prevSelIdx < currSelIdx) {//select downwards
            for (let i = prevSelIdx + 1; i <= currSelIdx; i++) {
                if (!tempRoutes[props.index]["selectedItems"].includes(filesList[i])) {
                    tempRoutes[props.index]["selectedItems"].push(filesList[i])
                }
            }
            props.setRoutes(tempRoutes)
        } else {

        }
    }
    const deselectAll = () => {
        setIsSelected(0)
        setItemSelected([])
        let tempRoutes = [...props.routes]
        tempRoutes[props.index]["selectedItems"] = []
        props.setRoutes(tempRoutes)
    }
    const navigateUp = () => { //3 tabs, previous tab back fail
        setMediaType(0)
        const parts = props.route['path'].split('/');
        parts.pop();
        const folderName = parts[parts.length - 1];
        const parentPath = parts.join('/');
        let tempRoutes = [...props.routes]
        let findIdx = tempRoutes.findIndex(obj => obj.key == props.route.key)
        tempRoutes[findIdx]["path"] = parentPath
        tempRoutes[findIdx]["title"] = props.route['path'] == RNFS.ExternalStorageDirectoryPath ? "Internal Storage" : folderName
        props.setRoutes(tempRoutes)
        props.setCurrentPath(props.route['path'])
    };
    return (
        <View style={{ flexDirection: 'column', flex: 1 }}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View>
                    <View style={styles.modalView}>
                        <Text>Hello World!</Text>
                        <Pressable onPress={() => setModalVisible(!modalVisible)}>
                            <Text>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {
                mediaType == 0 ? null :
                    <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                        {mediaType === 2 && <Video
                            // Can be a URL or a local file.
                            style={{ backgroundColor: '#152024', width: Dimensions.get('window').width, height: Math.round(Dimensions.get('window').width * 9 / 16), resizeMode: 'contain' }}
                            source={{ uri: 'file://' + itemSelected.path }}
                            controls={true}
                            repeat={true}
                            autoPlay={true}
                        />}
                        {mediaType === 1 && <Image style={{ backgroundColor: '#152024', width: Dimensions.get('window').width, height: Math.round(Dimensions.get('window').width * 3 / 4), resizeMode: 'contain' }}
                            source={{ uri: 'file://' + itemSelected.path }} />}
                        <View style={{ backgroundColor: '#435860', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={{ width: 350, color: 'white', paddingHorizontal: 20, paddingVertical: 10 }}>{itemSelected.name}</Text>
                            <TouchableOpacity onPress={() => { setItemSelected(""); setMediaType(0) }} style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                                <Text style={{ color: 'white' }}>⨯</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
            }
            {/* <Button onPress={() => navigateUp()} title="Back" /> */}
            <FlatList
                data={filesList}
                keyExtractor={(item) => item.path}
                renderItem={({ item }) => {
                    let ext = ""
                    if (item.isFile()) {
                        const parts = item.name.split(".")
                        ext = parts[parts.length - 1]
                    }
                    return (

                        <TouchableOpacity style={{ backgroundColor: props.route["selectedItems"].includes(item) ? '#435860' : '#06161C', borderWidth: itemSelected.path == item.path ? 1 : 0, borderStyle: 'dashed', borderColor: 'white' }} onLongPress={() => isSelected ? selectRange(item) : selectItem(item)} onPress={() => { isSelected ? selectItem(item) : handleFilePress(item) }}>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingVertical: 30,
                                    paddingHorizontal: 20,
                                    gap: 20
                                }}
                            >
                                <>
                                    {item.isDirectory() ? <Text style={{ color: '#979899' }}>+</Text> : <Text style={{ color: '#979899', fontSize: 10 }}>{ext}</Text>}
                                </>
                                <Text style={{ width: '80%', fontSize: 15, color: 'white' }}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
                }
            />

            {
                isSelected ? <><View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#152024', marginHorizontal: 20, marginVertical: 10, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 }}>
                    <Text style={{ color: '#979899', fontSize: 10 }}>{props.route["selectedItems"].length} items selected</Text>
                    <Text style={{ color: '#979899', fontSize: 10, textDecorationLine: 'underline' }} onPress={() => deselectAll()}>Deselect All</Text>
                </View>
                    <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-end', marginHorizontal: 20, marginVertical: 10 }}>
                        <TouchableOpacity style={{
                            backgroundColor: '#152024',
                            padding: 20,
                            borderRadius: 40,
                        }}>
                            <Image source={require('./assets/delete.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: '#152024',
                            padding: 20,
                            borderRadius: 40,
                        }}>
                            <Image source={require('./assets/rename.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: '#152024',
                            padding: 20,
                            borderRadius: 40,
                        }}>
                            <Image source={require('./assets/file.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: '#152024',
                            padding: 20,
                            borderRadius: 40,
                        }}>
                            <Image source={require('./assets/copy.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={{
                            backgroundColor: '#152024',
                            padding: 20,
                            borderRadius: 40,
                        }}>
                            <Image source={require('./assets/menu.png')} />
                        </TouchableOpacity>
                    </View>
                </> : ""}
        </View>
    )
}
const styles = StyleSheet.create({
    modalView: {
        width: '90%',
        backgroundColor: '#435860',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        elevation: 10,
    },
});

export default FileList