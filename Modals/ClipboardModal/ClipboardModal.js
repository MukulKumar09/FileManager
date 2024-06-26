import { Text, Pressable, View, Image, Modal } from "react-native";
import { useSelector, useDispatch } from "react-redux"
import styles, { backgroundColor } from "../../styles";
import useIcon from "../../Hooks/useIcon";

export default function ClipboardModal(props) {

    const dispatch = useDispatch()
    const state = {
        clipboardItems: useSelector(state => state.clipboardItems),
        operationType: useSelector(state => state.operationType),
    }
    return (
        <Modal
            transparent={true}>
            <Pressable
                onPressIn={() => dispatch({
                    type: "CLIPBOARDMODAL"
                })}
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
                    }}>Clear</Text>
                </View>
                {state.clipboardItems && state.clipboardItems.length && [0, 1].includes(state.operationType) ?
                    <View style={[styles.rowLayout]}>
                        <Text style={[styles.textDisabled]}>Below Items are ready to {state.operationType ? "Move" : "Copy"}. </Text>
                        <Text style={{ textDecorationLine: 'underline' }} onPress={() => dispatch({
                            type: "OPERATIONTYPE",
                            payload: state.operationType == 1 ? 0 : 1
                        })}>{state.operationType ? "Copy" : "Move"} instead</Text>
                    </View>
                    : null}
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
                                        {useIcon(item)}
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
                    onPressIn={() => dispatch({
                        type: "CLIPBOARDMODAL"
                    })}
                >
                    <Text style={[styles.text]}>Close</Text>
                </Pressable>
            </View>
        </Modal>
    )
}