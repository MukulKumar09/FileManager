import { Dimensions, Image, Text, TouchableOpacity, View, Animated } from "react-native";
import Video from "react-native-video";
import styles from "../../styles"

function MediaViewer(props) {

    return (
        <View style={{ flexDirection: 'column' }}>
            {props.mediaType === 2 && <Video
                // Can be a URL or a local file.
                style={{ backgroundColor: '#152024', width: Dimensions.get('window').width, height: Math.round(Dimensions.get('window').width * 9 / 16), resizeMode: 'contain' }}
                source={{ uri: 'file://' + props.selectedItem.path }}
                controls={true}
                repeat={true}
                autoPlay={true}
            />}

            {props.mediaType === 1 &&

                <Image style={{ backgroundColor: '#152024', width: Dimensions.get('window').width, height: Math.round(Dimensions.get('window').width * 9 / 16), resizeMode: 'contain' }}
                    source={{ uri: 'file://' + props.selectedItem.path }} />
            }
            <View style={{ backgroundColor: '#435860', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text, { width: 350, color: 'white' }]}>{props.selectedItem.name}</Text>
                <TouchableOpacity
                    style={{ paddingVertical: 20 }}
                    onPress={() => {
                        props.setMediaBox(0)
                    }}>
                    <Image style={{ height: 8, width: 8 }} source={require('../../assets/close.png')} />
                </TouchableOpacity>
            </View>

        </View>);
}
export default MediaViewer