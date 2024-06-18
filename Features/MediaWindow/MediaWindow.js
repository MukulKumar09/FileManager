import Animated from 'react-native-reanimated';
import MediaViewer from "../../MediaViewer";
export default function MediaWindow(props) {
    return (
        <Animated.View
            style={{
                height: height,
                overflow: 'hidden'
            }}
        >
            {mediaType == 0 ? null :
                <MediaViewer
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    mediaType={mediaType}
                    setMediaBox={setMediaBox}
                    setMediaType={setMediaType} />
            }
        </Animated.View>
    )
}