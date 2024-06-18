import { useCallback, useEffect, useMemo, useState } from "react";
import { Text, TextInput, Pressable, View, Image, ScrollView, Modal, TouchableWithoutFeedback, VirtualizedList } from "react-native";
import Share from 'react-native-share';
import styles, { backgroundColor, grey, secondaryColor } from "./styles";
import FilesList from "./FilesList";
// const Window = forwardRef((props, ref) => {
const Window = (props) => {
    const [filesList, setFilesList] = useState([])
    const [selectedItem, setSelectedItem] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [selectionFlag, setSelectionFlag] = useState(0)

    const [sortModal, setSortModal] = useState(0)
    const [sortType, setSortType] = useState(1)
    const [sortOrder, setSortOrder] = useState(0)
    const [searchFlag, setSearchFlag] = useState(0)
    const [breadCrumbs, setBreadCrumbs] = useState([])

    // useImperativeHandle(ref, () => ({
    //     rerender: (visibility) => {
    //         setZIndex(visibility)
    //     }
    // }));


    useEffect(() => { //first
        if (props.filesList == undefined)
            props.buildCache(props.tabData["path"])
        setBreadCrumbs(props.breadCrumbsTabName()) //set breadcrumbs, tabname
    }, [props.tabData["path"]])

    useEffect(() => {
        if (props.filesList !== undefined)
            handleSort(props.filesList)
    }, [props.filesList])

    useEffect(() => {
        if (selectedItems.length == 0)
            setSelectionFlag(0)
        else
            setSelectionFlag(1)
    }, [selectedItems])

    useEffect(() => {
        if (props.currTab == props.index) {
            console.log(props.funcId)
            switch (props.funcId) {
                case 0: {//copy
                    props.readySet(0, selectedItems)
                    break
                }
                case 1: {//move
                    props.readySet(1, selectedItems)
                    break
                }
                case 2: {//delete
                    props.readySet(2, selectedItems)
                    break
                }
                case 3: {//rename
                    props.readySet(3, selectedItem)
                    break
                }
            }
        }
    }, [props.funcId])

    const handlePress = (item) => {
        if (selectionFlag) {
            selectItem(item)
        }
        else {
            if (item.isDirectory()) {
                props.setTabPath(item["path"])
            }
            else
                props.fileHandler(item), setSelectedItem(item)
        }
    }
    const handleLongPress = (item) => {
        if (selectionFlag)
            rangeSelect(item)
        else
            selectItem(item)
    }

    const handleSort = (items) => {
        setSortModal(0)
        if (sortType == 0) { //name
            items.sort((a, b) => {
                var x = a["name"];
                var y = b["name"];
                if (sortOrder) {
                    return ((x < y) ? 1 : ((x > y) ? -1 : 0));
                } else {
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                }
            })
            setFilesList(items)
        }
        if (sortType == 1) { //type
            let allFolders = items.filter(i => i.isDirectory())
            allFolders.sort((a, b) => {
                var x = a["name"];
                var y = b["name"];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            })
            let allFiles = items.filter(i => i.isFile())
            allFiles.sort((a, b) => {
                var x = a["name"].split(".").pop();
                var y = b["name"].split(".").pop();
                if (x === y) {
                    return a["name"].localeCompare(b["name"]);
                } else {
                    // Otherwise, sort by extension
                    if (sortOrder) {
                        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
                    } else {
                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    }
                }
            })
            setFilesList([...allFolders, ...allFiles])
        }
        if (sortType == 2) {

        }
        if (sortType == 3) {//size
            let allFolders = items.filter(i => i.isDirectory())
            allFolders.sort((a, b) => {
                var x = a["name"];
                var y = b["name"];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            })
            let allFiles = items.filter(i => i.isFile())
            allFiles.sort((a, b) => {
                var x = a["size"];
                var y = b["size"];
                if (sortOrder) {
                    return ((x < y) ? 1 : ((x > y) ? -1 : 0));
                } else {
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                }
            })
            setFilesList([...allFolders, ...allFiles])
        }
    }

    const selectItem = (item) => {
        props.setMediaType(0)
        props.setMediaBox(0)
        setSelectedItem(item)
        let res = props.selectItem([...selectedItems], item)
        setSelectedItems(res)
    }

    const rangeSelect = (item) => {
        let tempSelectedItems = [...selectedItems]
        setSelectedItem(item)
        const lastSelectedItem = tempSelectedItems[tempSelectedItems.length - 1]
        const lastSelectedItemIndexInFilesList = filesList.indexOf(lastSelectedItem)
        const newSelectedItemIndexInFilesList = filesList.indexOf(item)
        if (newSelectedItemIndexInFilesList > lastSelectedItemIndexInFilesList) { //downwards
            for (let i = lastSelectedItemIndexInFilesList + 1; i <= newSelectedItemIndexInFilesList; i++) {
                !tempSelectedItems.includes(filesList[i]) && tempSelectedItems.push(filesList[i])
            }
        } else {
            for (let i = newSelectedItemIndexInFilesList; i <= lastSelectedItemIndexInFilesList - 1; i++) {
                !tempSelectedItems.includes(filesList[i]) && tempSelectedItems.push(filesList[i])
            }
        }
        setSelectedItems(tempSelectedItems)
    }

    const shareFiles = async () => {
        try {
            let filesToShare = [];
            for (let i = 0; i < selectedItems.length; i++) {
                if (selectedItems[i].isFile()) {
                    console.log('file://' + selectedItems[i]["path"])
                    filesToShare.push('file://' + selectedItems[i]["path"])
                }
            }
            await Share.open({
                title: 'Share Files',
                urls: filesToShare,
                failOnCancel: false,
            });
        } catch (error) {
            console.error('Error sharing files: ', error);
        }
    }

    const renderItem =
        // useCallback(
        ({ item }) => {
            return (
                <Pressable
                    style={
                        [
                            styles.rowLayout,
                            styles.padding,
                            selectedItems.includes(item) && styles.listItemHighlight,
                            selectedItem == item && styles.listItemSelected
                        ]
                    }
                    onPress={() => {
                        handlePress(item)
                    }}
                    onLongPress={() => {
                        handleLongPress(item)
                    }}
                >
                    <View style={[
                        styles.rowLayout,
                        styles.wide,
                        styles.bigGap,
                    ]}>
                        <View style={{ width: 30, }}>
                            {props.Icon(item)}
                        </View>
                        <View style={[
                            styles.wide,
                        ]}>
                            <Text style={[styles.text]}>{item["name"]}</Text>
                        </View>
                    </View>
                    {item.isFile() ?
                        <View style={{ width: 30, alignItems: 'flex-end' }}>
                            <Text style={[styles.text,
                            styles.smallDarkText]}>
                                {item["size"]}
                            </Text>
                        </View>
                        : null
                    }
                </Pressable>
            )
        }
    // , [selectedItem, selectedItems, selectionFlag])

    return (
        <View style={
            {
                backgroundColor: backgroundColor,
                height: '100%',
                display: props.currTab == props.index ? "flex" : "none"
            }
        }>
            {sortModal ? <Modal
                transparent={true}
            >
                <TouchableWithoutFeedback
                    onPress={() => setSortModal(0)}
                >
                    <View style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        position: 'absolute'
                    }}
                    />
                </TouchableWithoutFeedback>

                <View style={[
                    styles.pill,
                    styles.modal,
                    styles.mediumGap,
                    styles.padding,
                    {
                        backgroundColor: backgroundColor,
                        position: 'absolute',
                        left: 10,
                        right: 10,
                        bottom: 10,
                    }
                ]}>
                    <Text style={[styles.text,
                    styles.headingText]}>Sort</Text>
                    <View style={[styles.divider]} />
                    <View style={[styles.rowLayout, styles.mediumGap]}>
                        <Pressable
                            style={[
                                styles.pill,
                                styles.wide,
                                sortType == 0 ? styles.pillHighlight : null,
                                styles.padding]}
                            onPressIn={() => setSortType(0)}
                        >
                            <Text style={[styles.text]}>Name</Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.pill,
                                styles.wide,
                                sortType == 1 ? styles.pillHighlight : null,
                                styles.padding]}
                            onPressIn={() => setSortType(1)}
                        >
                            <Text style={[styles.text]}>Type</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.rowLayout, styles.mediumGap]}>
                        <Pressable
                            style={[
                                styles.pill,
                                styles.wide,
                                sortType == 2 ? styles.pillHighlight : null,
                                styles.padding]}
                            onPressIn={() => setSortType(2)}
                        >
                            <Text style={[styles.text]}>Date</Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.pill,
                                styles.wide,
                                sortType == 3 ? styles.pillHighlight : null,
                                styles.padding]}
                            onPressIn={() => setSortType(3)}
                        >
                            <Text style={[styles.text]}>Size</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.divider]} />
                    <Pressable
                        style={[
                            styles.pill,
                            sortOrder == 1 ? styles.pillHighlight : null,
                            styles.padding, { width: '100%' }]}
                        onPressIn={() => setSortOrder(!sortOrder)}
                    >
                        <Text style={[styles.text]}>{sortOrder ? "Descending" : "Ascending"}</Text>
                    </Pressable>
                    <View style={[styles.divider]} />
                    <View style={[styles.rowLayout,
                    styles.mediumGap]}>
                        <Pressable
                            style={[
                                styles.pill,
                                styles.wide,
                                styles.padding]}
                            onPressIn={() => setSortModal(0)}
                        >
                            <Text style={[styles.text]}>Cancel</Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.pill,
                                styles.wide,
                                styles.pillHighlight,
                                styles.padding]}
                            onPressIn={() => handleSort(filesList)}
                        >
                            <Text style={[styles.text]}>Done</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
                : null
            }
            {/* <View style={[{ backgroundColor: backgroundColor, position: 'absolute', zIndex: 1, width: '100%' }]}>
                <View style={[styles.padding]}>
                    <Text style={[styles.text,
styles.headingText]}>Properties</Text>
                    <View style={[styles.divider]} />
                    <View style={[styles.rowLayout,
styles.listItem]}>
                        <Text style={[styles.text]}>Path</Text>
                        <Text style={[styles.text]}>{properties["path"]}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#435860', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text, { width: 350, color: 'white', paddingHorizontal: 20, paddingVertical: 10 }]}>Properties</Text>
                    <Pressable
                        style={{ paddingHorizontal: 20, paddingVertical: 10 }}
>
                        <Text style={{ color: 'white' }}>⨯</Text>
                    </Pressable>
                </View>
            </View> */}
            {
                // filesList.length == 0 ?
                //     <View style={[
                //         styles.wide,
                //         styles.padding,
                //         {
                //             alignItems: 'center'
                //         }
                //     ]}>
                //         <Text style={[styles.text]}>Nothing to show</Text>
                //     </View> :
                useMemo(() => {
                    return (
                        <FilesList
                            buildCache={props.buildCache}
                            tabData={props.tabData}
                            setSelectedItems={setSelectedItems}
                            setSelectedItem={setSelectedItem}
                            finalList={filesList}
                            renderItem={renderItem}
                        />
                    )
                }, [filesList, selectedItem, selectedItems, selectionFlag])
            }


            <View>
                {selectionFlag ?
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
                            {selectedItems.length} items selected</Text>
                        <View style={[styles.rowLayout, styles.bigGap]}>
                            <Text style={[
                                styles.text
                            ], {
                                color: '#979899',
                                fontSize: 10,
                                textDecorationLine: 'underline'
                            }}
                                onPressIn={() => {
                                    setSelectedItems([])
                                    setSelectedItem([])
                                }}>Deselect All</Text>
                            <Text style={[
                                styles.text
                            ], {
                                color: '#979899',
                                fontSize: 10,
                                textDecorationLine: 'underline'
                            }}
                                onPressIn={() => setSelectedItems(props.filesList)}>Select All</Text>
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
                                    setSortModal(1)
                                }}
                                style={[
                                    styles.smallPill,
                                ]}>
                                <Image
                                    style={[styles.smallImageIcon]}
                                    source={require('./assets/sort.png')} />

                            </Pressable>
                            <Pressable
                                onPressIn={() => {
                                    setSearchFlag(1)
                                }}
                                style={[
                                    styles.smallPill,
                                ]}>
                                <Image
                                    style={[styles.smallImageIcon]}
                                    source={require('./assets/search.png')} />

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
                                    breadCrumbs.length > 0 && Object.values(breadCrumbs).map((folder, i) => {
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
                                        style={[styles.smallPill,
                                        styles.smallText,
                                        styles.text,
                                        styles.textDisabled]}
                                    >Back</Text>
                                </Pressable>
                            </>
                        }
                    </View>
                }
            </View>
            {searchFlag ? <View style={[
                styles.rowLayout,
                styles.pill,
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
                                handleSort(props.filesList)
                            }
                            else {
                                text = new RegExp(text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), 'i')
                                handleSort(props.filesList.filter((item) => text.test(item["name"])))
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
                            handleSort(props.filesList)
                            setSearchFlag(0)
                        }}>
                        <Image style={{ height: 8, width: 8 }} source={require('./assets/close.png')} />
                    </Pressable>
                </View>
            </View>

                : null}
        </View>)
}
export default Window