import { Text, Pressable, View, Modal } from "react-native";
import styles, { backgroundColor } from "../../styles";
import { useSelector, useDispatch } from "react-redux"
import MaterialIcon from "../../Common/MaterialIcon/MaterialIcon";
import MenuItem from "../../Common/MenuItem/MenuItem";
import Clipboard from '@react-native-clipboard/clipboard';

export default function WebBrowserModal() {
    const dispatch = useDispatch()
    const state = {
        tabs: useSelector(state => state.tabs),
        currentTab: useSelector(state => state.currentTab),
        tabCounter: useSelector(state => state.tabCounter),
        favouriteItems: useSelector(state => state.favouriteItems),
        favouritesModal: useSelector(state => state.favouritesModal),
        webBrowserModal: useSelector(state => state.webBrowserModal)
    }
    return (
        <Modal
            onRequestClose={() => dispatch({
                type: "WEBBROWSERMODAL",
                payload: 0
            })
            }
            transparent={true}
        >
            <Pressable
                onPress={() => dispatch({
                    type: "WEBBROWSERMODAL",
                    payload: 0
                })
                }
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
                <View style={[
                    styles.rowLayout,
                    styles.bigGap,
                    styles.padding,
                    styles.wide
                ]
                }>
                    <MaterialIcon
                        name="web"
                    />
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={
                            [
                                styles.text,
                                styles.textDisabled,
                                styles.wide
                            ]
                        }
                    >{state.webBrowserModal["url"]}</Text>
                </View>
                <View style={[styles.divider]} />
                <MenuItem
                    functionName={() => {
                        dispatch({
                            type: "ADDTAB",
                            payload: {
                                tabKey: state.tabCounter,
                                title: "Browser",
                                path: state.webBrowserModal["url"],
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
                        dispatch({
                            type: "WEBBROWSERMODAL",
                            payload: 0
                        })
                    }}
                    icon="tab-plus" name="Open URL in new tab"
                />
                {state.webBrowserModal["type"] == "image" &&
                    <MenuItem
                        functionName={() => {

                        }}
                        icon="download-outline" name="Download Image"
                    />
                }
                <MenuItem
                    functionName={() => {
                        Clipboard.setString(state.webBrowserModal["url"]);
                        dispatch({
                            type: "TOAST",
                            payload:
                                "Copied to clipboard",
                        })
                        dispatch({
                            type: "WEBBROWSERMODAL",
                            payload: 0
                        })
                    }}
                    icon="content-copy" name="Copy link address"
                />
                {/* <MenuItem
                    functionName={() => useCache(dispatch, state.tabs[state.currentTab]["url"])}
                    icon="share" name="Share link"
                /> */}
            </View>
        </Modal>
    )
}