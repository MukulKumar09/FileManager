import { Dimensions, Image, Text, TouchableOpacity, View, Animated } from "react-native";
import Video from "react-native-video";
import styles from "./styles"

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
            <View style={{ backgroundColor: '#435860', justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text, { width: 350, color: 'white', paddingHorizontal: 20, paddingVertical: 10 }]}>{props.selectedItem.name}</Text>
                <TouchableOpacity onPress={() => { props.setMediaType(0) }} style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                    <Text style={{ color: 'white' }}>⨯</Text>
                </TouchableOpacity>
            </View>

        </View>);
}
export default MediaViewer