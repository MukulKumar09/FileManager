import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View, ScrollView, Dimensions, Image, ToastAndroid, Alert, Modal, TextInput } from "react-native";
import RNFS from 'react-native-fs';
import styles from "./styles";

export default Home = (props) => {
    return (
        <View style={[styles.wide, styles.padding, styles.bigGap, { flexDirection: 'column' }]}>
            <View style={[styles.bigGap, { flexDirection: 'column' }]}>

                <Image style={{ height: 113, width: 235, marginTop: 50, marginBottom: 50 }} source={require('./assets/thetabber.png')} />

                <TouchableOpacity
                    onPress={() => props.openFavourite(props.favPaths[0])}
                    style={[styles.pill, styles.rowLayout, styles.input, styles.bigGap, styles.padding]}>
                    <View style={{ height: 15, width: 15 }}>
                        <Image style={{ flex: 1, height: undefined, width: undefined }} source={require('./assets/internalstorage.png')} />
                    </View>
                    <Text style={[styles.text]}>Internal Storage</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.openFavourite(props.favPaths[1])}
                    style={[styles.pill, styles.rowLayout, styles.input, styles.bigGap, styles.padding]}>
                    <View style={{ height: 15, width: 15 }}>
                        <Image style={{ flex: 1, height: undefined, width: undefined }} source={require('./assets/internalstorage.png')} />
                    </View>
                    <Text style={[styles.text]}>External Storage</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }
                    }
                    style={[styles.pill, styles.rowLayout, styles.input, styles.bigGap, styles.padding]}>
                    <View style={{ height: 15, width: 15 }}>
                        <Image style={{ flex: 1, height: undefined, width: undefined }} source={require('./assets/root.png')} />
                    </View>
                    <Text style={[styles.text]}>Root</Text>
                </TouchableOpacity>
                <View style={[styles.divider]} />
                <TouchableOpacity
                    onPress={() => { }
                    }
                    style={[styles.pill, styles.rowLayout, styles.input, styles.bigGap, styles.padding]}>
                    <View style={{ height: 15, width: 15 }}>
                        <Image style={{ flex: 1, height: undefined, width: undefined }} source={require('./assets/settings.png')} />
                    </View>
                    <Text style={[styles.text]}>Settings</Text>
                </TouchableOpacity>
            </View>

            {/* <View style={[styles.divider]} />
            <View style={[styles.rowLayout, styles.bigGap]}>
                <TouchableOpacity
                    onPress={() => { }
                    }
                    style={[styles.pill, styles.wide, styles.padding]}>
                    <Text style={[styles.text]}>LAN</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.rowLayout, styles.bigGap]}>
                <TouchableOpacity
                    onPress={() => { }
                    }
                    style={[styles.pill, styles.wide, , styles.padding]}>
                    <Text style={[styles.text]}>FTP</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }
                    }
                    style={[styles.pill, styles.wide, , styles.padding]}>
                    <Text style={[styles.text]}>Google Drive</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.rowLayout, styles.bigGap]}>
                <TouchableOpacity
                    onPress={() => { }
                    }
                    style={[styles.pill, styles.wide, , styles.padding]}>
                    <Text style={[styles.text]}>Mediafire</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }
                    }
                    style={[styles.pill, styles.wide, , styles.padding]}>
                    <Text style={[styles.text]}>Dropbox</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.rowLayout, styles.bigGap]}>
                <TouchableOpacity
                    onPress={() => { }
                    }
                    style={[styles.pill, styles.wide, , styles.padding]}>
                    <Text style={[styles.text]}>Onedrive</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }
                    }
                    style={[styles.pill, styles.wide, , styles.padding]}>
                    <Text style={[styles.text]}>Webdav</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    )
}