import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector, useDispatch } from "react-redux"
import Video from "react-native-video";
import styles from "../../styles"
import MaterialIcon from "../../Common/SmallMaterialIcon/SmallMaterialIcon";

function MediaViewer() {
    const dispatch = useDispatch()
    const state = {
        mediaBox: useSelector(state => state.mediaBox),
        mediaType: useSelector(state => state.mediaType),
        selectedItem: useSelector(state => state.selectedItem)
    }
    return (
        <View style={{ flexDirection: 'column' }}>
            {state.mediaType === 1 && <Image style={{ backgroundColor: '#152024', width: Dimensions.get('window').width, height: Math.round(Dimensions.get('window').width * 9 / 16), resizeMode: 'contain' }}
                source={{ uri: 'file://' + state.selectedItem["path"] }} />}
            {state.mediaType === 2 && <Video
                // Can be a URL or a local file.
                style={{ backgroundColor: '#152024', width: Dimensions.get('window').width, height: Math.round(Dimensions.get('window').width * 9 / 16), resizeMode: 'contain' }}
                source={{ uri: 'file://' + state.selectedItem["path"] }}
                controls={true}
                repeat={true}
                autoPlay={true}
            />}
            <View style={{ backgroundColor: '#435860', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text, { width: 350, color: 'white' }]}>{state.selectedItem["name"]}</Text>
                <TouchableOpacity
                    style={{ paddingVertical: 20 }}
                    onPress={() => dispatch({
                        type: "SETMEDIABOX",
                        payload: 0
                    })}>
                    <MaterialIcon name="close" />
                </TouchableOpacity>
            </View>

        </View>);
}
export default MediaViewer