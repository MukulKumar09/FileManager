import { Text, Pressable, View, Image, Modal, Linking } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useSelector, useDispatch } from "react-redux"
import styles, { backgroundColor, grey } from "../../styles";
import MaterialIcon from "../../Common/MaterialIcon/MaterialIcon";
import SmallMaterialIcon from "../../Common/SmallMaterialIcon/SmallMaterialIcon";

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
            <Animated.View
                entering={FadeInDown.duration(50)}
                exiting={FadeOutDown.duration(50)}
                style={[styles.wide]}
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
                    {
                        backgroundColor: backgroundColor,
                        position: 'absolute',
                        left: 10,
                        right: 10,
                        bottom: 10,
                    }
                ]}>
                    <View style={
                        [
                            styles.rowLayout,
                            styles.padding,
                            styles.bigGap
                        ]
                    }>

                        <MaterialIcon name="coffee-outline" />
                        <Text style={[
                            styles.text,
                            styles.headingText
                        ]}>About</Text>
                    </View>
                    <View style={[styles.divider]} />
                    <View style={[styles.padding, styles.bigGap]}>
                        <View style={
                            [
                                styles.rowLayout,
                                styles.bigGap
                            ]
                        }>
                            <Image source={{ uri: 'https://github.com/MukulKumar09.png' }}
                                style={{
                                    height: 70,
                                    width: 70,
                                    borderRadius: 20
                                }} />
                            <View>
                                <Text style={[styles.text]}>Author: Mukul Kumar{"\n"}</Text>
                                <View style={
                                    [
                                        styles.mediumGap
                                    ]
                                }>
                                    <View style={
                                        [
                                            styles.rowLayout,
                                            styles.mediumGap
                                        ]
                                    }>
                                        <Pressable
                                            onPressIn={() => Linking.openURL('https://www.linkedin.com/in/mukul-kumar-488b1119b/')}
                                            style={[
                                                styles.rowLayout,
                                                styles.mediumGap,
                                                styles.smallPill
                                            ]}
                                        >
                                            <SmallMaterialIcon name="linkedin" color={grey} />
                                            <Text
                                                style={[
                                                    styles.text, styles.smallText,
                                                    styles.textDisabled
                                                ]}>
                                                LinkedIn
                                            </Text>
                                        </Pressable>
                                        <Pressable
                                            onPressIn={() => Linking.openURL('https://www.reddit.com/user/ElectionExciting2087/')}
                                            style={[
                                                styles.rowLayout,
                                                styles.mediumGap,
                                                styles.smallPill
                                            ]}
                                        >
                                            <SmallMaterialIcon name="reddit" color={grey} />
                                            <Text
                                                style={[
                                                    styles.text, styles.smallText,
                                                    styles.textDisabled
                                                ]}>
                                                Reddit
                                            </Text>
                                        </Pressable>
                                    </View>
                                    <View style={
                                        [
                                            styles.rowLayout,
                                            styles.mediumGap
                                        ]
                                    }>
                                        <Pressable
                                            onPressIn={() => Linking.openURL('http://tabberfm.000webhostapp.com')}
                                            style={[
                                                styles.rowLayout,
                                                styles.mediumGap,
                                                styles.smallPill
                                            ]}
                                        >
                                            <SmallMaterialIcon name="web" color={grey} />
                                            <Text
                                                style={[
                                                    styles.text, styles.smallText,
                                                    styles.textDisabled
                                                ]}>
                                                Privacy Policy
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={[styles.text]}>
                                Thanks for downloading my app!
                                {"\n"}
                                I'm an independent developer based out of India. My goal is to keep all of my products free to use.
                                {"\n"}
                                However this won't be possible without your support!
                                {"\n"}
                                All you need to do is rate 5 stars and leave a feedback on Play Store.
                            </Text>
                        </View>
                        <View style={[styles.divider]} />
                        <View
                            style={[
                                styles.rowLayout,
                            ]}
                        >
                            <Text style={[styles.text, styles.smallText]}>
                                Known Issues:
                                {"\n"}
                                {"\n"}
                                &bull; Moving Folders leaves empty folders behind
                                {"\n"}
                                &bull; Items in Recycle Bin still shows up as regular files
                                {"\n"}
                                &bull; Cancelling Copy, Move, Delete Progress is not supported
                                {"\n"}
                                &bull; Clearing cache deletes favourites
                                {"\n"}
                                &bull; Media Viewer popup breaks it's layout in landscape orientation
                                {"\n"}
                                &bull; Large lists in dialogue boxes might not show all item
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.rowLayout,
                                styles.mediumGap,
                            ]}
                        >
                            <Pressable
                                onPress={() => {
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
                                onPressIn={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.tabber')}
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
                </View>
            </Animated.View>
        </Modal>
    )
}