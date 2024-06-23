import { Text, Pressable, View, Image, Modal } from "react-native";
import { CombinedReducersContext, CombinedDispatchContext } from "../../Context/Context"
import styles, { backgroundColor } from "../../styles";
import { useContext } from "react";

export default function ClipboardModal(props) {

    const state = useContext(CombinedReducersContext)
    const dispatch = useContext(CombinedDispatchContext)
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
                        dispatch({
                            type: 'CLEARCB'
                        })
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
                    {state.clipboardItems && state.clipboardItems.length > 0 ?

                        state.clipboardItems.map(
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
                                            dispatch({
                                                type: 'DELETECB',
                                                payload: item["path"]
                                            })
                                        }}
                                    >
                                        <Image
                                            style={[styles.imageIcon]}
                                            source={require('../../assets/close.png')} />
                                    </Pressable>
                                </View>
                        ) :
                        <Text style={[styles.text, styles.textDisabled]}>No items</Text>}
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