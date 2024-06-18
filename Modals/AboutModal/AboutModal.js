import { Text, Pressable, View, Image, Modal, Linking } from "react-native";
import styles, { backgroundColor } from "../../styles";

export default function AboutModal(props) {
    return (
        <Modal
            transparent={true}
        >
            <Pressable
                onPressIn={() => setAboutModal(0)}
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
                    <Image
                        style={[styles.imageIcon]}
                        source={require('../../assets/about.png')} />
                    <Text style={[
                        styles.text,
                        styles.headingText
                    ]}>About</Text>
                </View>
                <View style={[styles.divider]} />
                <View style={[styles.rowLayout, styles.bigGap, { alignItems: 'flex-start' }]}>
                    <Image source={{ uri: 'https://github.com/MukulKumar09.png' }}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 30
                        }} />
                    <View style={[styles.wide]}>
                        <Text style={[styles.text]}>Author: Mukul Kumar{"\n"}</Text>
                        <Pressable
                            onPressIn={() => Linking.openURL('https://github.com/MukulKumar09')}
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
                                https://github.com/MukulKumar09
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
                            setAboutModal(0)
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
                            setAboutModal(0)
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