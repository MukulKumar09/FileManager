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
        tabCounter: useSelector(state => state.tabCounter),
        webBrowserModal: useSelector(state => state.webBrowserModal)
    }
    const [urlVal, setUrlVal] = useState(state.tabs[state.currentTab]["path"])
    const [url, setUrl] = useState(state.tabs[state.currentTab]["path"])
    const [isLoading, setIsLoading] = useState(0)
    const webViewRef = useRef(null)

    useEffect(() => {
        if (state.currentTab == props.index) {
            const backAction = () => {
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
                source={{ uri: url == "[Home]" ? "https://tabberfm.000webhostapp.com/home.html" : url }}
                ref={webViewRef}
                incognito={true}
                onLoadStart={() => setIsLoading(1)}
                onLoadEnd={(synthenticEvent) => {
                    dispatch({
                        type: "MODIFYTABPATH",
                        payload: {
                            tabId: state.currentTab,
                            value: synthenticEvent["nativeEvent"]["url"]
                        }
                    })
                    dispatch({
                        type: "MODIFYTABNAME",
                        payload: {
                            tabId: state.currentTab,
                            value: synthenticEvent["nativeEvent"]["title"]
                        }
                    })
                    setIsLoading(0)
                }}
                saveFormDataDisabled={true}
                onNavigationStateChange={linkClick}
                mixedContentMode='never'
                thirdPartyCookiesEnabled={false}
                onOpenWindow={(synthenticEvent) => {
                    synthenticEvent.preventDefault()
                    dispatch({
                        type: "ADDTAB",
                        payload: {
                            tabKey: state.tabCounter,
                            title: "Browser",
                            path: synthenticEvent["nativeEvent"]["targetUrl"],
                            type: "webbrowser",
                        }
                    })
                    dispatch({
                        type: "SETCURRENTTAB",
                        payload: state.tabCounter
                    })
                    dispatch({
                        type: "INCREASETABCOUNTER",
                    })
                }}
                onMessage={(event) => {
                    event = JSON.parse(event["nativeEvent"]["data"])
                    if (event["type"] == "modal")
                        dispatch({
                            type: "WEBBROWSERMODAL",
                            payload: {
                                path: event["url"]
                            }
                        })
                    if (event["type"] == "target_blank")
                        console.log("abcd")
                }}
                injectedJavaScript={`
                let pressTimer;
                    function clearPressTimer(event) {
                        window.clearTimeout(pressTimer);
                        pressTimer = null;
                        window.removeEventListener("touchstart", clearPressTimer);
                        window.removeEventListener("touchcancel", clearPressTimer);
                        window.removeEventListener("touchmove", clearPressTimer);
                        window.removeEventListener("touchend", clearPressTimer);
                    };
                    window.addEventListener(
                        "touchstart", 
                        function(event) {
                            if (event.target.tagName.toLowerCase() === 'a' || event.target.getAttribute('role')==='link') {
                                let link={type:"modal",url:event.target.toString()};
                                pressTimer = window.setTimeout(function() {
                                        window.ReactNativeWebView.postMessage(JSON.stringify(link));
                                    }
                                , 500);
                                };
                            window.addEventListener("touchcancel", clearPressTimer);
                            window.addEventListener("touchmove", clearPressTimer);
                            window.addEventListener("touchend", clearPressTimer);
                        }
                    );
                `}
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
                        onPress={() => {
                            webViewRef.current.reload()
                            setIsLoading(1)
                        }}
                    ><SmallMaterialIcon name="reload" color={grey} />
                    </Pressable>
                }
                <TextInput
                    ref={input => { this.textInput = input; }}
                    value={urlVal}
                    returnKeyType="search"
                    selectTextOnFocus={true}
                    onChangeText={(url) => setUrlVal(url)}
                    onSubmitEditing={() => {
                        this.textInput.blur();
                        if (urlVal.includes("://")) {
                            setUrl(urlVal)
                        } else {
                            setUrl("https://google.com/search?q=" + urlVal)
                        }
                    }}
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