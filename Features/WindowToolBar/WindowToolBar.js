import { Text, Pressable, View, ScrollView, Image, TextInput } from "react-native";
import styles, { grey, secondaryColor } from "../../styles";

export default function WindowToolBar(props) {
    return (
        <>
            <View>
                {props.selectionFlag ?
                    <View style={[
                        styles.rowLayout,
                        styles.pill,
                        styles.paddingCloseBottom, {
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                        }
                    ]}>
                        <Text style={[
                            styles.text
                        ], {
                            color: '#979899',
                            fontSize: 10
                        }}>
                            {props.selectedItems.length} items selected</Text>
                        <View style={[styles.rowLayout, styles.bigGap]}>
                            <Text style={[
                                styles.text
                            ], {
                                color: '#979899',
                                fontSize: 10,
                                textDecorationLine: 'underline'
                            }}
                                onPress={() => {
                                    props.setSelectedItems([])
                                    props.setSelectedItem([])
                                }}>Deselect All</Text>
                            <Text style={[
                                styles.text
                            ], {
                                color: '#979899',
                                fontSize: 10,
                                textDecorationLine: 'underline'
                            }}
                                onPress={() => setSelectedItems(props.filesList)}>Select All</Text>
                        </View>
                    </View>
                    :
                    <View style={[styles.rowLayout,
                    styles.smallGap,
                    styles.paddingCloseBottom]}>
                        <View style={[styles.rowLayout,
                        styles.smallGap]}>
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
                                    props.setSearchFlag(1)
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
                            <View style={[styles.rowLayout,
                            styles.smallGap, { transform: [{ scaleX: -1 }] }]}>
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
                                    props.breadCrumbs.length > 0 && Object.values(props.breadCrumbs).map((folder, i) => {
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

                        {props.tabData["path"] == "Home" ? null :
                            <>
                                <Text style={{ color: secondaryColor }}>  |  </Text>
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
                }
            </View>
            {props.searchFlag ? <View style={[
                styles.rowLayout,
                styles.pill,
                styles.bordered,
                styles.paddingCloseBottom,
                styles.smallGap,
                {
                    // position: 'absolute',
                    // zIndex: 1,
                    justifyContent: 'space-between',
                }
            ]}
            >
                <View style={[
                    styles.input,
                    styles.wide]}>
                    <TextInput
                        autoFocus={true}
                        style={[styles.text,
                        styles.wide]}
                        placeholder="Search"
                        multiline={true}
                        placeholderTextColor={grey}
                        onChangeText={text => {
                            if (text == "") {
                                props.handleSort(props.filesList)
                            }
                            else {
                                text = new RegExp(text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), 'i')
                                props.handleSort(props.filesList.filter((item) => text.test(item["name"])))
                            }
                        }}
                    />
                </View>

                <View style={[styles.rowLayout,
                styles.smallGap]}>
                    {/* <Pressable
                                style={[styles.rowLayout,
                                styles.pill, deepSearch ? styles.pillHighlight : null,
                                styles.padding]}
                                onPressIn={() => { setDeepSearch(!deepSearch) }}>
                                <Text style={[styles.text]}>Deep</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.pill,
                                styles.pillHighlight,
                                styles.padding]}
                                onPressIn={() => { }}>
                                <Image source={require('./assets/search.png')} />
                            </Pressable> */}
                    <Pressable
                        style={[styles.pill,
                        styles.padding]}
                        onPressIn={() => {
                            props.handleSort(props.filesList)
                            props.setSearchFlag(0)
                        }}>
                        <Image style={{ height: 8, width: 8 }} source={require('../../assets/close.png')} />
                    </Pressable>
                </View>
            </View>

                : null}
        </>
    )
}