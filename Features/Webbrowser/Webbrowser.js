import { BackHandler, Keyboard, Pressable, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { WebView } from 'react-native-webview';
import { useEffect, useRef, useState } from "react";
import styles, { grey } from "../../styles";
import SmallMaterialIcon from "../../Common/SmallMaterialIcon/SmallMaterialIcon";

export default function Webbrowser() {
    const state = {
        tabs: useSelector(state => state.tabs),
        currentTab: useSelector(state => state.currentTab),
    }
    const [urlVal, setUrlVal] = useState(state.tabs[state.currentTab]["path"])
    const [url, setUrl] = useState(state.tabs[state.currentTab]["path"])
    const webViewRef = useRef(null)

    useEffect(() => {
        const backAction = () => {
            webViewRef.current.goBack()
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    }, [])


    const linkClick = (page) => {
        setUrlVal(page.url)
        setUrl(page.url)
    }
    return (
        <View style={
            {
                flex: 1,
            }
        }>
            <WebView
                source={{ uri: url }}
                ref={webViewRef}
                incognito={true}
                saveFormDataDisabled={true}
                onNavigationStateChange={linkClick}
            />
            {/* <CircularButton
                    functionName={() => { webViewRef.current.goBack(); }
                    }
                    name="arrow-left"
                /> */}
            <View style={
                [
                    styles.rowLayout,
                    styles.paddingCloseBottom,
                    styles.pill,
                    {
                        paddingHorizontal: 10
                    }
                ]
            }>
                <TextInput
                    ref={input => { this.textInput = input; }}
                    value={urlVal}
                    onChangeText={(url) => setUrlVal(url)}
                    multiline={true}
                    // onBlur={() => Keyboard.dismiss()}
                    style={[
                        styles.text,
                        styles.wide,
                        {
                            textAlignVertical: "top",
                            height: 50
                        }
                    ]}
                />
                <Pressable
                    style={[styles.smallPill]}
                    onPress={() => {
                        this.textInput.blur();
                        setUrl(urlVal)
                    }}
                ><SmallMaterialIcon name="arrow-right-bottom" color={grey} />
                </Pressable>
                <Pressable
                    style={[styles.smallPill]}
                    onPress={() => webViewRef.current.goForward()}
                ><SmallMaterialIcon name="arrow-right" color={grey} />
                </Pressable>
                <Pressable
                    style={[styles.smallPill]}
                    onPress={() => webViewRef.current.goForward()}
                ><SmallMaterialIcon name="menu" color={grey} />
                </Pressable>
            </View>
        </View>
    )
}