import { Text, Pressable, View, Image } from "react-native";
import styles from "../../styles";

export default function ContextMenu(props) {
    return (<View style={{
        position: 'absolute',
        zIndex: 1,
        height: '100%',
        width: '100%',
    }}>
        <Pressable
            onPressIn={() => props.setContextMenu(0)}
            style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            }}
        >
        </Pressable>

        <View
            style={[
                styles.pill,
                {
                    position: 'absolute',
                    bottom: 100,
                    right: 10,
                    width: '50%',
                    elevation: 10,
                    shadowColor: 'black',
                }
            ]}
        >
            <Pressable
                style={[
                    styles.padding
                ]}
                onPress={() => {
                    props.deleteAllTabs()
                    props.setContextMenu(0)
                }}
            >
                <Text style={[styles.text]}>Close all tabs</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.padding
                ]}
                onPress={() => {
                    props.deleteCurrTab()
                    props.setContextMenu(0)
                }}
            >
                <Text style={[styles.text]}>Close this tab</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.wide,
                    styles.padding
                ]}
                onPress={() => {
                    props.deleteOtherTabs()
                    props.setContextMenu(0)
                }}
            >
                <Text style={[styles.text]}>Close other tabs</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.rowLayout,
                    styles.bigGap,
                    styles.wide,
                    styles.padding
                ]}
                onPress={() => {
                    props.buildCache(tabs[currTab]["path"])
                }}
            ><Image
                    style={[styles.imageIcon]}
                    source={require('../../assets/refresh.png')} />
                <Text style={[styles.text]}>Refresh</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.rowLayout,
                    styles.bigGap,
                    styles.wide,
                    styles.padding
                ]}
                onPress={() => { props.setClipBoardModal(1) }}
            >
                <Image
                    style={[styles.imageIcon]}
                    source={require('../../assets/archive.png')} />
                <Text style={[styles.text]}>Clipboard</Text>
            </Pressable>

            {/* 
                            <View
                                style={[
                                    styles.rowLayout
                                ]}>
                                <Pressable
                                    style={[
                                        styles.rowLayout,
                                        styles.bigGap,
                                        styles.wide,
                                        styles.padding
                                    ]}
                                    onPressIn={() => { readySet(4, selectedItems) }}
                               ><Image source={require('../../assets/archive.png')} />
                                    <Text style={[styles.text]}>Archive</Text>
                                </Pressable>
                            </View>
                             */}
            <Pressable
                style={[
                    styles.rowLayout,
                    styles.bigGap,
                    styles.wide,
                    styles.padding
                ]}
                onPress={() => { props.setAboutModal(1) }}
            ><Image
                    style={[styles.imageIcon]}
                    source={require('../../assets/about.png')} />
                <Text style={[styles.text]}>About</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.rowLayout,
                    styles.bigGap,
                    styles.wide,
                    styles.padding
                ]}
                onPress={() => { props.setContextMenu(0) }}
            ><Image
                    style={[styles.imageIcon]}
                    source={require('../../assets/close.png')} />
                <Text style={[styles.text]}>Close</Text>
            </Pressable>
        </View>
    </View>)
}