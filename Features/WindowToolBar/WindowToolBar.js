import { Text, Pressable, View, ScrollView, Image, TextInput } from "react-native";
import styles, { secondaryColor } from "../../styles";
import SearchBar from "../SearchBar/SearchBar";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";

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
                            , {
                                color: '#979899',
                                fontSize: 10
                            }
                        ]}>
                            {props.selectedItems.length} items selected</Text>
                        <View style={[styles.rowLayout, styles.bigGap]}>
                            <Text style={[
                                styles.text,
                                {
                                    color: '#979899',
                                    fontSize: 10,
                                    textDecorationLine: 'underline'
                                }]}
                                onPress={() => {
                                    props.setSelectedItems([])
                                    props.setSelectedItem([])
                                }}>Deselect All</Text>
                            <Text style={[
                                styles.text,
                                {
                                    color: '#979899',
                                    fontSize: 10,
                                    textDecorationLine: 'underline'
                                }
                            ]}
                                onPress={() => setSelectedItems(props.filesList)}>Select All</Text>
                        </View>
                    </View>
                    : null
                }
                <BreadCrumbs
                    setSortModal={props.setSortModal}
                    setSearchFlag={props.setSearchFlag}
                    setTabPath={props.setTabPath}
                    breadCrumbs={props.breadCrumbs}
                    tabData={props.tabData}
                />
                {props.searchFlag ?
                    <SearchBar
                        handleSort={props.handleSort}
                        filesList={props.filesList}
                        setSearchFlag={props.setSearchFlag}
                    />
                    : null}
            </View>
        </>
    )
}