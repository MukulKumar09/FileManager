import { View, Image, Pressable, ScrollView, Text } from "react-native";
import styles, { secondaryColor } from "../../styles";
import { CombinedReducersContext, CombinedDispatchContext } from "../../Context/Context";
import { useContext, useEffect, useState } from "react";
import useBreadCrumbs from "../../Hooks/useBreadCrumbs";

export default function BreadCrumbs(props) {
    const state = useContext(CombinedReducersContext)
    const dispatch = useContext(CombinedDispatchContext)
    const [breadCrumbs, setBreadCrumbs] = useState([])
    useEffect(() => {
        setBreadCrumbs(useBreadCrumbs(state)) //set breadcrumbs, tabname
    }, [state.tabs[state.currentTab]["path"]])
    useEffect(() => { console.log(breadCrumbs) }, [breadCrumbs])
    return (
        <View style={[
            styles.rowLayout,
            styles.smallGap,
            styles.paddingCloseBottom
        ]}>
            <View style={[
                styles.rowLayout,
                styles.smallGap
            ]}>
                <Pressable
                    onPressIn={() => {
                        props.setSortModal(1)
                    }}
                    style={[
                        styles.smallPill,
                    ]}>
                    <Image
                        style={[styles.smallImageIcon]}
                        source={require('../../assets/sort.png')} />

                </Pressable>
                <Pressable
                    onPressIn={() => {
                        props.setSearchModal(1)
                    }}
                    style={[
                        styles.smallPill,
                    ]}>
                    <Image
                        style={[styles.smallImageIcon]}
                        source={require('../../assets/search.png')} />

                </Pressable>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ transform: [{ scaleX: -1 }] }}
            >
                <View style={[
                    styles.rowLayout,
                    styles.smallGap,
                    {
                        transform: [{ scaleX: -1 }]
                    }
                ]}>
                    <Pressable
                        onPress={() => dispatch({
                            type: "MODIFYTABPATH",
                            payload: {
                                tabId: state.currentTab,
                                value: "Home"
                            }
                        })}
                    >
                        <Text
                            style={[styles.smallPill,
                            styles.smallText,
                            styles.text,
                            styles.textDisabled]}
                        >Home</Text>
                    </Pressable>
                    {//convert this to ref control
                        breadCrumbs && Object.values(breadCrumbs).map((folder, i) => {
                            return (
                                <View key={i} style={[
                                    styles.rowLayout,
                                    styles.smallGap, {
                                        maxWidth: 130
                                    }
                                ]}>
                                    <Text
                                        style={[
                                            styles.text,
                                            styles.smallText
                                        ]}>></Text>
                                    <Pressable
                                        onPress={() => dispatch({
                                            type: "MODIFYTABPATH",
                                            payload: {
                                                tabId: state.currentTab,
                                                value: folder["path"]
                                            }
                                        })}
                                    >
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={[styles.smallPill,
                                            styles.smallText,
                                            styles.text,
                                            styles.textDisabled]}
                                        >{folder["name"]}</Text>
                                    </Pressable>
                                </View>
                            )
                        })

                    }

                </View>
            </ScrollView>

            {state.tabs[state.currentTab]["path"] == "Home" ? null :
                <>
                    <Text style={
                        {
                            color: secondaryColor
                        }
                    }>  |  </Text>
                    <Pressable
                        onPressIn={() => {
                            let path = state.tabs[state.currentTab]["path"]
                            for (let i = 0; i < state.cache["Home"].length; i++) {
                                if (path == state.cache["Home"][i]["path"]) {
                                    dispatch({
                                        type: "MODIFYTABPATH",
                                        payload: {
                                            tabId: state.currentTab,
                                            value: "Home"
                                        }
                                    })
                                    return 0
                                }
                            }
                            path = path.split("/")
                            path.pop()
                            path = path.join("/")
                            dispatch({
                                type: "MODIFYTABPATH",
                                payload: {
                                    tabId: state.currentTab,
                                    value: path
                                }
                            })
                        }}
                        style={[
                            styles.smallPill,
                            styles.bordered,
                        ]}
                    >
                        <Text
                            style={[
                                styles.smallText,
                                styles.text,
                                styles.textDisabled,
                            ]}
                        >
                            Back
                        </Text>
                    </Pressable>
                </>
            }
        </View>
    )
}