import {
  ActivityIndicator,
  BackHandler,
  Keyboard,
  Pressable,
  TextInput,
  View,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {WebView} from 'react-native-webview';
import {useEffect, useRef, useState} from 'react';
import styles, {grey} from '../../styles';
import SmallMaterialIcon from '../../Common/SmallMaterialIcon/SmallMaterialIcon';
import RNFS from 'react-native-fs';

export default function Webview(props) {
  const dispatch = useDispatch();
  const state = {
    tabs: useSelector(state => state.tabs),
    currentTab: useSelector(state => state.currentTab),
    tabCounter: useSelector(state => state.tabCounter),
    webBrowserModal: useSelector(state => state.webBrowserModal),
  };
  const [urlVal, setUrlVal] = useState(state.tabs[state.currentTab]['path']);
  const [url, setUrl] = useState();
  const [isLoading, setIsLoading] = useState(0);
  const webViewRef = useRef(null);

  useEffect(() => {
    evaluateUrl();
  }, []);

  useEffect(() => {
    if (state.currentTab == props.index) {
      const backAction = () => {
        webViewRef.current.goBack();
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }
  }, [state.tabs, state.currentTab]);

  const readLocal = async () => {
    setUrl({
      html: await RNFS.readFile(urlVal),
    });
  };

  const evaluateUrl = () => {
    if (urlVal.includes('://')) {
      if (urlVal.includes('file://')) {
        readLocal();
      } else {
        setUrl({
          uri: urlVal,
        });
      }
    } else {
      if (urlVal == '') {
        setUrl({
          uri: 'https://google.com',
        });
      } else {
        setUrl({
          uri: 'https://google.com/search?q=' + urlVal,
        });
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <WebView
        ref={webViewRef}
        source={url}
        scalesPageToFit={true}
        incognito={true}
        saveFormDataDisabled={true}
        thirdPartyCookiesEnabled={false}
        onLoadStart={() => setIsLoading(1)}
        onNavigationStateChange={page => setUrlVal(page.url)}
        originWhitelist={['*']}
        mixedContentMode="never"
        onLoadEnd={synthenticEvent => {
          dispatch({
            type: 'MODIFYTABPATH',
            payload: {
              tabId: props.index,
              value: synthenticEvent['nativeEvent']['url'],
            },
          });
          dispatch({
            type: 'MODIFYTABNAME',
            payload: {
              tabId: props.index,
              value: synthenticEvent['nativeEvent']['title'],
            },
          });
          setIsLoading(0);
        }}
        onOpenWindow={synthenticEvent => {
          synthenticEvent.preventDefault();
          dispatch({
            type: 'ADDTAB',
            payload: {
              tabKey: state.tabCounter,
              title: 'Browser',
              path: synthenticEvent['nativeEvent']['targetUrl'],
              type: 'webview',
            },
          });
          dispatch({
            type: 'SETCURRENTTAB',
            payload: state.tabCounter,
          });
          dispatch({
            type: 'INCREASETABCOUNTER',
          });
        }}
        onMessage={event => {
          event = JSON.parse(event['nativeEvent']['data']);
          dispatch({
            type: 'WEBBROWSERMODAL',
            payload: event,
          });
        }}
        injectedJavaScript={`
                let pressTimer;
                let link={};
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
                            if (
                                event.target.tagName.toLowerCase() === 'a' 
                                || event.target.getAttribute('role')==='link'
                                || event.target.tagName.toLowerCase() === 'img' 
                            ) {
                                pressTimer = window.setTimeout(function() {
                                    link["type"]="link";
                                    if(event.target.href)
                                        link["url"]=event.target.href; 
                                    else if(event.target.src)
                                        link["url"]=event.target.src; 
                                    window.ReactNativeWebView.postMessage(JSON.stringify(link));
                                    }
                                , 500);
                            }
                            window.addEventListener("touchcancel", clearPressTimer);
                            window.addEventListener("touchmove", clearPressTimer);
                            window.addEventListener("touchend", clearPressTimer);
                        }
                    );
                `}
      />
      <View
        style={[
          styles.rowLayout,
          styles.paddingCloseBottom,
          styles.pill,
          {
            paddingHorizontal: 10,
          },
        ]}>
        {isLoading ? (
          <>
            <Pressable
              style={[styles.smallPill]}
              onPress={() => webViewRef.current.stopLoading()}>
              <SmallMaterialIcon name="close" color={grey} />
            </Pressable>
            <ActivityIndicator />
          </>
        ) : (
          <Pressable
            style={[styles.smallPill]}
            onPress={() => {
              webViewRef.current.reload();
              setIsLoading(1);
            }}>
            <SmallMaterialIcon name="reload" color={grey} />
          </Pressable>
        )}
        <TextInput
          ref={input => {
            this.textInput = input;
          }}
          value={urlVal}
          returnKeyType="search"
          selectTextOnFocus={true}
          onChangeText={url => setUrlVal(url)}
          onSubmitEditing={() => {
            this.textInput.blur();
            evaluateUrl();
          }}
          // onBlur={() => Keyboard.dismiss()}
          style={[styles.text, styles.textDisabled, styles.wide]}
        />
        <Pressable
          style={[styles.smallPill]}
          onPress={() => {
            this.textInput.blur();
            evaluateUrl;
          }}>
          <SmallMaterialIcon name="arrow-right-bottom" color={grey} />
        </Pressable>
        <Pressable
          style={[styles.smallPill]}
          onPress={() => webViewRef.current.goForward()}>
          <SmallMaterialIcon name="arrow-right" color={grey} />
        </Pressable>
      </View>
    </View>
  );
}
