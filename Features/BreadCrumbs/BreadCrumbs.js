import { View, Image, Pressable, ScrollView, Text } from "react-native";
import styles, { secondaryColor } from "../../styles";
import { CombinedReducersContext } from "../../Context/Context";
import { useContext, useEffect, useState } from "react";
import useBreadCrumbs from "../../Hooks/useBreadCrumbs";

export default function BreadCrumbs(props) {
    const state = useContext(CombinedReducersContext)
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
                        onPress={() => props.setTabPath("Home")}
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
                                        onPress={() => props.setTabPath(folder["path"])}
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
                            props.setTabPath(null)
                        }}
                    >
                        <Text
                            style={[
                                styles.smallPill,
                                styles.bordered,
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