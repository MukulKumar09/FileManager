import { Text, Pressable, View, Image, Modal, Linking } from "react-native";
import { useSelector, useDispatch } from "react-redux"
import styles, { backgroundColor } from "../../styles";
import MaterialIcon from "../../Common/MaterialIcon/MaterialIcon";

export default function AboutModal() {
    const dispatch = useDispatch()
    const state = {
        aboutModal: useSelector(state => state.aboutModal),
    }
    return (
        <Modal
            onRequestClose={() => dispatch({
                type: "ABOUTMODAL"
            })}
            visible={state.aboutModal}
            transparent={true}
        >
            <Pressable
                onPress={() => dispatch({
                    type: "ABOUTMODAL"
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
                <View style={[styles.rowLayout, styles.bigGap]}>

                    <MaterialIcon name="coffee-outline" />
                    <Text style={[
                        styles.text,
                        styles.headingText
                    ]}>About</Text>
                </View>
                <View style={[styles.divider]} />
                <View style={[styles.rowLayout, styles.bigGap, { alignItems: 'flex-start' }]}>
                    <Image source={{ uri: 'https://github.com/MukulKumar09.png' }}
                        style={{
                            height: 80,
                            width: 80,
                            borderRadius: 20
                        }} />
                    <View>
                        <Text style={[styles.text]}>Author: Mukul Kumar{"\n"}</Text>
                        <Pressable
                            onPressIn={() => Linking.openURL('https://www.linkedin.com/in/mukul-kumar-488b1119b/')}
                            style={[
                                styles.smallPill
                            ]}
                        >
                            <Text
                                style={[
                                    styles.smallText,
                                    styles.text,
                                    styles.textDisabled
                                ]}>
                                LinkedIn
                            </Text>
                        </Pressable>
                    </View>
                </View>

                <Text style={[styles.text, styles.smallText]}>
                    {"\n"}
                    Thanks for downloading my app!
                    {"\n"}
                    You can support this independent project by rating and leaving a feedback on Play Store.
                    {"\n"}
                </Text>
                <View
                    style={[
                        styles.rowLayout,
                        styles.mediumGap,
                        styles.wide
                    ]}
                >
                    <Pressable
                        onPressIn={() => {
                            dispatch({
                                type: "ABOUTMODAL"
                            })
                        }
                        }
                        style={[
                            styles.pill,
                            styles.centered,
                            styles.wide,
                            styles.padding
                        ]}>
                        <Text style={[styles.text]}>Close</Text>
                    </Pressable>
                    <Pressable
                        onPressIn={() => {
                            dispatch({
                                type: "ABOUTMODAL"
                            })
                        }
                        }
                        style={[
                            styles.pill,
                            styles.pillHighlight,
                            styles.centered,
                            styles.wide,
                            styles.padding
                        ]}>
                        <Text style={[styles.text]}>⭐  Rate</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}