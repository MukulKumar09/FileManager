import { Text, Pressable, View, Image, Modal } from "react-native";
import styles, { backgroundColor } from "../../styles";

export default function ClipboardModal(props) {
    return (
        <Modal
            transparent={true}>
            <Pressable
                onPressIn={() => props.setClipBoardModal(0)}
                style={[styles.modalBackground]}
            />
            <View style={[
                styles.pill,
                styles.modal,
                styles.bigGap,
                styles.padding,
                {
                    backgroundColor: backgroundColor,
                    position: 'absolute',
                    left: 10,
                    right: 10,
                    bottom: 10,
                }
            ]}>
                <View style={[
                    styles.rowLayout,
                    , {
                        width: '100%',
                        justifyContent: 'space-between'
                    }]}>
                    <View style={[styles.rowLayout, styles.bigGap]}>
                        <Image
                            style={[styles.imageIcon]}
                            source={require('../../assets/archive.png')} />
                        <Text style={[
                            styles.text,
                            styles.headingText
                        ]}>Clipboard</Text>
                    </View>
                    <Text style={[
                        styles.text,
                        styles.textDisabled,
                        {
                            textDecorationLine: 'underline'
                        }
                    ]} onPress={() => {
                        props.clipboardItems.current = []
                        props.setShowPaste(0)
                    }}>Clear</Text>
                </View>
                <View style={[styles.divider]} />

                <View style={[
                    {
                        flexDirection: 'column',
                        width: '100%',
                    }
                ]}>
                    {props.clipboardItems.current.length == 0 ?
                        <Text style={[styles.text, styles.textDisabled]}>No items</Text>
                        : props.clipboardItems.current.map(
                            (item, i) =>
                                <View
                                    key={i}
                                    style={[
                                        styles.rowLayout,
                                    ]}>
                                    <Pressable
                                        style={[
                                            styles.rowLayout,
                                            styles.bigGap,
                                            styles.wide,
                                            {
                                                paddingVertical: 10
                                            }]}
                                    >
                                        {props.Icon(item)}
                                        <Text style={[styles.text]}>{item["name"]}</Text>
                                    </Pressable>
                                    <Pressable
                                        onPressIn={() => {
                                            props.clipboardItems.current.splice(i, 1)
                                            props.setForceRefresh(!forceRefresh)
                                        }}
                                    >
                                        <Image
                                            style={[styles.imageIcon]}
                                            source={require('../../assets/close.png')} />
                                    </Pressable>
                                </View>
                        )}
                </View>
                <View style={[styles.divider]} />
                <Pressable
                    style={[
                        styles.pill,
                        styles.centered,
                        styles.padding
                        , {
                            width: '100%'
                        }]}
                    onPressIn={() => props.setClipBoardModal(0)}
                >
                    <Text style={[styles.text]}>Close</Text>
                </Pressable>
            </View>
        </Modal>
    )
}