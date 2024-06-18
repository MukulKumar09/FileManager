import Animated from 'react-native-reanimated';
import MediaViewer from "../MediaViewer/MediaViewer";
export default function MediaWindow(props) {
    return (
        <Animated.View
            style={{
                height: props.height,
                overflow: 'hidden'
            }}
        >
            {props.mediaType == 0 ? null :
                <MediaViewer
                    selectedItem={props.selectedItem}
                    setSelectedItem={props.setSelectedItem}
                    mediaType={props.mediaType}
                    setMediaBox={props.setMediaBox}
                    setMediaType={props.setMediaType} />
            }
        </Animated.View>
    )
}