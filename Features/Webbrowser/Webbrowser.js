import { ActivityIndicator, BackHandler, Keyboard, Pressable, TextInput, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { WebView } from 'react-native-webview';
import { useEffect, useRef, useState } from "react";
import styles, { grey } from "../../styles";
import SmallMaterialIcon from "../../Common/SmallMaterialIcon/SmallMaterialIcon";

export default function Webbrowser(props) {
    const dispatch = useDispatch()
    const state = {
        tabs: useSelector(state => state.tabs),
        currentTab: useSelector(state => state.currentTab),
        webBrowserModal: useSelector(state => state.webBrowserModal)
    }
    const [urlVal, setUrlVal] = useState(state.tabs[state.currentTab]["path"])
    const [url, setUrl] = useState(state.tabs[state.currentTab]["path"])
    const [isLoading, setIsLoading] = useState(0)
    const [link, setLink] = useState(0)
    const webViewRef = useRef(null)

    useEffect(() => {
        if (state.currentTab == props.index) {
            const backAction = () => {
                console.log(webViewRef.current)
                webViewRef.current.goBack()
                return true;
            };
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction,
            );
            return () => backHandler.remove();
        }
    }, [state.tabs, state.currentTab])

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
                onLoadStart={() => setIsLoading(1)}
                onLoadEnd={() => setIsLoading(0)}
                injectedJavaScript={`
                let pressTimer;
                    window.addEventListener("touchstart", function(event) {
                    if (event.target.tagName.toLowerCase() === 'a' || event.target.getAttribute('role')==='link') {
                        event.preventDefault();
                        pressTimer = window.setTimeout(function() {
                            window.ReactNativeWebView.postMessage(event.target.toString());
                        }, 500);
                    }
                    function clearPressTimer(event) {
                        window.clearTimeout(pressTimer);
                        pressTimer = null;
                        
                        // Remove event listeners after execution
                        window.removeEventListener("touchstart", clearPressTimer);
                        window.removeEventListener("touchcancel", clearPressTimer);
                        window.removeEventListener("touchmove", clearPressTimer);
                        window.removeEventListener("touchend", clearPressTimer);
                    }
                    window.addEventListener("touchcancel", clearPressTimer);
                    window.addEventListener("touchmove", clearPressTimer);
                    window.addEventListener("touchend", clearPressTimer);
                });
                `}
                onMessage={(event) => {
                    dispatch({
                        type: "WEBBROWSERMODAL",
                        payload: {
                            path: event.nativeEvent.data
                        }
                    })
                }}
                saveFormDataDisabled={true}
                onNavigationStateChange={linkClick}
            />
            {/* <CircularButton
                    functionName={() => { [webViewRef+state.currentTab].current.goBack(); }
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
                {isLoading ?
                    <>
                        <Pressable
                            style={[styles.smallPill]}
                            onPress={() => webViewRef.current.stopLoading()}
                        >
                            <SmallMaterialIcon name="close" color={grey} />
                        </Pressable>
                        <ActivityIndicator />
                    </>
                    : <Pressable
                        style={[styles.smallPill]}
                        onPress={() => webViewRef.current.reload()}
                    ><SmallMaterialIcon name="reload" color={grey} />
                    </Pressable>
                }
                <TextInput
                    ref={input => { this.textInput = input; }}
                    value={urlVal}
                    selectTextOnFocus={true}
                    onChangeText={(url) => setUrlVal(url)}
                    // onBlur={() => Keyboard.dismiss()}
                    style={[
                        styles.text,
                        styles.textDisabled,
                        styles.wide
                    ]}
                />
                <Pressable
                    style={[styles.smallPill]}
                    onPress={() => {
                        this.textInput.blur();
                        if (urlVal.includes("://")) {
                            setUrl(urlVal)
                        } else {
                            setUrl("https://google.com/search?q=" + urlVal)
                        }
                    }}
                ><SmallMaterialIcon name="arrow-right-bottom" color={grey} />
                </Pressable>
                <Pressable
                    style={[styles.smallPill]}
                    onPress={() => webViewRef.current.goForward()}
                ><SmallMaterialIcon name="arrow-right" color={grey} />
                </Pressable>
                {/* <Pressable
                    style={[styles.smallPill]}
                    onPress={() => [webViewRef+state.currentTab].current.goForward()}
                ><SmallMaterialIcon name="menu" color={grey} />
                </Pressable> */}
            </View>
        </View>
    )
}