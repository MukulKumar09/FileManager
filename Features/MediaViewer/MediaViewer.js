import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Video from "react-native-video";
import styles, { backgroundColor, secondaryColor } from "../../styles";
import MaterialIcon from "../../Common/SmallMaterialIcon/SmallMaterialIcon";

function MediaViewer() {
    const dispatch = useDispatch()
    const state = {
        mediaBox: useSelector(state => state.mediaBox),
        mediaType: useSelector(state => state.mediaType),
    }
    return (
        <View>
            {state.mediaType === 1 && <Image style={
                {
                    backgroundColor: backgroundColor,
                    width: Dimensions.get('window').width,
                    height: Math.round(Dimensions.get('window').width * 9 / 16),
                    resizeMode: 'contain'
                }
            }
                source={{ uri: 'file://' + state.mediaBox["path"] }} />}
            {state.mediaType === 2 && <Video
                // Can be a URL or a local file.
                source={{ uri: 'file://' + state.mediaBox["path"] }}
                controls={true}
                repeat={true}
                autoPlay={true}
                style={
                    {
                        backgroundColor: backgroundColor,
                        width: Dimensions.get('window').width,
                        height: Math.round(Dimensions.get('window').width * 9 / 16),
                        resizeMode: 'contain'
                    }
                }
            />}
            <View style={
                {
                    backgroundColor: secondaryColor,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                }
            }>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={
                        [
                            styles.text,
                            styles.wide,
                            {
                                padding: 15,
                                color: 'white'
                            }
                        ]
                    }>{state.mediaBox["name"]}</Text>
                <TouchableOpacity
                    style={
                        {
                            padding: 15
                        }
                    }
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