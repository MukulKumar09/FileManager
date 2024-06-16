import { useCallback, useEffect, useMemo, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView, Modal, TouchableWithoutFeedback, VirtualizedList } from "react-native";
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
    const [contextMenu, setContextMenu] = useState(0)
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
                <TouchableOpacity
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
                </TouchableOpacity>
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

            {
                sortModal ? <Modal
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
                            <TouchableOpacity
                                style={[
                                    styles.pill,
                                    styles.wide,
                                    sortType == 0 ? styles.pillHighlight : null,
                                    styles.padding]}
                                onPress={() => setSortType(0)}
                            >
                                <Text style={[styles.text]}>Name</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.pill,
                                    styles.wide,
                                    sortType == 1 ? styles.pillHighlight : null,
                                    styles.padding]}
                                onPress={() => setSortType(1)}
                            >
                                <Text style={[styles.text]}>Type</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.rowLayout, styles.mediumGap]}>
                            <TouchableOpacity
                                style={[
                                    styles.pill,
                                    styles.wide,
                                    sortType == 2 ? styles.pillHighlight : null,
                                    styles.padding]}
                                onPress={() => setSortType(2)}
                            >
                                <Text style={[styles.text]}>Date</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.pill,
                                    styles.wide,
                                    sortType == 3 ? styles.pillHighlight : null,
                                    styles.padding]}
                                onPress={() => setSortType(3)}
                            >
                                <Text style={[styles.text]}>Size</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.divider]} />
                        <TouchableOpacity
                            style={[
                                styles.pill,
                                sortOrder == 1 ? styles.pillHighlight : null,
                                styles.padding, { width: '100%' }]}
                            onPress={() => setSortOrder(!sortOrder)}
                        >
                            <Text style={[styles.text]}>{sortOrder ? "Descending" : "Ascending"}</Text>
                        </TouchableOpacity>
                        <View style={[styles.divider]} />
                        <View style={[styles.rowLayout,
                        styles.mediumGap]}>
                            <TouchableOpacity
                                style={[
                                    styles.pill,
                                    styles.wide,
                                    styles.padding]}
                                onPress={() => setSortModal(0)}
                            >
                                <Text style={[styles.text]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.pill,
                                    styles.wide,
                                    styles.pillHighlight,
                                    styles.padding]}
                                onPress={() => handleSort(filesList)}
                            >
                                <Text style={[styles.text]}>Done</Text>
                            </TouchableOpacity>
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
                    <TouchableOpacity
                        style={{ paddingHorizontal: 20, paddingVertical: 10 }}
                    >
                        <Text style={{ color: 'white' }}>⨯</Text>
                    </TouchableOpacity>
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

            {contextMenu ?
                <View style={{
                    position: 'absolute',
                    zIndex: 1,
                    height: '100%',
                    width: '100%',
                }}>
                    <TouchableWithoutFeedback
                        onPress={() => setContextMenu(0)}
                    >
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                            }}
                        />
                    </TouchableWithoutFeedback>
                    <View
                        style={[
                            styles.pill,
                            {
                                position: 'absolute',
                                bottom: 0,
                                right: 10,
                                width: '50%',
                                flexDirection: 'column',
                                elevation: 10,
                                shadowColor: 'black',
                            }
                        ]}
                    >
                        <View
                            style={[
                                styles.rowLayout
                            ]}>
                            <TouchableOpacity
                                style={[
                                    styles.rowLayout,
                                    styles.bigGap,
                                    styles.wide,
                                    styles.padding
                                ]}
                                onPress={() => {
                                    props.buildCache(props.tabData["path"])
                                    setSelectedItems([])
                                    setSelectedItem([])
                                }}
                            ><Image source={require('./assets/refresh.png')} />
                                <Text style={[styles.text]}>Refresh</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={[
                                styles.rowLayout
                            ]}>
                            <TouchableOpacity
                                style={[
                                    styles.rowLayout,
                                    styles.bigGap,
                                    styles.wide,
                                    styles.padding
                                ]}
                                onPress={() => { props.setClipBoardModal(1) }}
                            >
                                <Image source={require('./assets/archive.png')} />
                                <Text style={[styles.text]}>Clipboard</Text>
                            </TouchableOpacity>
                        </View>
                        {/* {selectionFlag ?
                            <View
                                style={[
                                    styles.rowLayout
                                ]}>
                                <TouchableOpacity
                                    style={[
                                        styles.rowLayout,
                                        styles.bigGap,
                                        styles.wide,
                                        styles.padding
                                    ]}
                                    onPress={() => { props.readySet(4, selectedItems) }}
                                ><Image source={require('./assets/archive.png')} />
                                    <Text style={[styles.text]}>Archive</Text>
                                </TouchableOpacity>
                            </View>
                            : null} */}
                        {selectedItem.length == [] ? null : <View
                            style={[
                                styles.rowLayout
                            ]}>
                            <TouchableOpacity
                                style={[
                                    styles.rowLayout,
                                    styles.bigGap,
                                    styles.wide,
                                    styles.padding
                                ]}
                                onPress={() => {
                                    props.openExternally(selectedItem.path)
                                }}
                            ><Image source={require('./assets/openwith.png')} />
                                <Text style={[styles.text]}>Open With</Text>
                            </TouchableOpacity>
                        </View>
                        }
                        <View
                            style={[
                                styles.rowLayout
                            ]}>
                            <TouchableOpacity
                                style={[
                                    styles.rowLayout,
                                    styles.bigGap,
                                    styles.wide,
                                    styles.padding
                                ]}
                                onPress={() => { props.newItem(1, props.tabData["path"]) }}
                            ><Image source={require('./assets/newfile.png')} />
                                <Text style={[styles.text]}>New File</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={[
                                styles.rowLayout
                            ]}>
                            <TouchableOpacity
                                style={[
                                    styles.rowLayout,
                                    styles.bigGap,
                                    styles.wide,
                                    styles.padding
                                ]}
                                onPress={() => { props.newItem(0, props.tabData["path"]) }}
                            ><Image source={require('./assets/newfolder.png')} />
                                <Text style={[styles.text]}>New Folder</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={[
                                styles.rowLayout
                            ]}>
                            <TouchableOpacity
                                style={[
                                    styles.rowLayout,
                                    styles.bigGap,
                                    styles.wide,
                                    styles.padding
                                ]}
                                onPress={() => { setSortModal(1) }}
                            ><Image source={require('./assets/sort.png')} />
                                <Text style={[styles.text]}>Sort</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={[
                                styles.rowLayout
                            ]}>
                            <TouchableOpacity
                                style={[
                                    styles.rowLayout,
                                    styles.bigGap,
                                    styles.wide,
                                    styles.padding
                                ]}
                                onPress={() => { setContextMenu(0) }}
                            ><Image source={require('./assets/close.png')} />
                                <Text style={[styles.text]}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View >
                : null
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
                                onPress={() => {
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
                                onPress={() => setSelectedItems(props.filesList)}>Select All</Text>
                        </View>
                    </View>
                    :
                    <View style={[styles.rowLayout,
                    styles.smallGap,
                    styles.paddingCloseBottom]}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{ transform: [{ scaleX: -1 }] }}
                        >
                            <View style={[styles.rowLayout,
                            styles.smallGap, { transform: [{ scaleX: -1 }] }]}>
                                <TouchableOpacity
                                >
                                    <Text
                                        onPress={() => props.setTabPath("Home")}
                                        style={[styles.smallPill,
                                        styles.smallText,
                                        styles.text,
                                        styles.textDisabled]}
                                    >Home</Text>
                                </TouchableOpacity>
                                {//convert this to ref control
                                    breadCrumbs.length > 0 && Object.values(breadCrumbs).map((folder, i) => {
                                        return (
                                            <View key={i} style={[styles.rowLayout,
                                            styles.smallGap]}>
                                                <Text
                                                    style={[styles.text,
                                                    styles.smallText]} >></Text>
                                                <TouchableOpacity
                                                    onPress={() => props.setTabPath(folder["path"])}
                                                >
                                                    <Text
                                                        style={[styles.smallPill,
                                                        styles.smallText,
                                                        styles.text,
                                                        styles.textDisabled]}
                                                    >{folder["name"]}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })

                                }
                            </View>
                        </ScrollView>

                        {props.tabData["path"] == "Home" ? null :
                            <>
                                <Text style={{ color: secondaryColor }}>  |  </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        props.setTabPath(null)
                                    }}
                                >
                                    <Text
                                        style={[styles.smallPill,
                                        styles.smallText,
                                        styles.text,
                                        styles.textDisabled]}
                                    >Back</Text>
                                </TouchableOpacity>
                            </>
                        }
                    </View>
                }
                <View
                    style={[
                        styles.paddingCloseBottom,
                        styles.pill,
                        {
                            alignItems: 'flex-end',
                            overflow: 'hidden'
                        }]}
                >
                    {searchFlag ? <View style={[
                        styles.rowLayout,
                        styles.pill,
                        styles.smallGap,
                        {
                            position: 'absolute',
                            zIndex: 1,
                            justifyContent: 'space-between',
                        }
                    ]
                    }
                    >
                        <View style={[styles.input,
                        styles.wide]}>
                            <TextInput
                                autoFocus={true}
                                style={[styles.text,
                                styles.wide]}
                                placeholder="Search"
                                placeholderTextColor={grey}
                                onChangeText={text => {
                                    if (text == "")
                                        handleSort(props.filesList)
                                    else
                                        handleSort(props.filesList.filter((item) => item["name"].includes(text)))
                                }}
                            />
                        </View>

                        <View style={[styles.rowLayout,
                        styles.smallGap]}>
                            {/* <TouchableOpacity
                                style={[styles.rowLayout,
                                styles.pill, deepSearch ? styles.pillHighlight : null,
                                styles.padding]}
                                onPress={() => { setDeepSearch(!deepSearch) }}>
                                <Text style={[styles.text]}>Deep</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.pill,
                                styles.pillHighlight,
                                styles.padding]}
                                onPress={() => { }}>
                                <Image source={require('./assets/search.png')} />
                            </TouchableOpacity> */}
                            <TouchableOpacity
                                style={[styles.pill,
                                styles.padding]}
                                onPress={() => {
                                    handleSort(props.filesList)
                                    setSearchFlag(0)
                                }}>
                                <Image style={{ height: 8, width: 8 }} source={require('./assets/close.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>

                        : null}

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{
                            transform: [{ scaleX: -1 }]
                        }}
                    >
                        <View style={[
                            styles.rowLayout,
                            {
                                transform: [{ scaleX: -1 }]
                            }
                        ]
                        }>
                            {!props.progressModal && selectionFlag ?
                                <>
                                    <TouchableOpacity
                                        style={[styles.pill,
                                        styles.padding]}
                                        onPress={() => { props.readySet(2, selectedItems, props.tabData["path"]) }}>
                                        <Image source={require('./assets/delete.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.pill,
                                        styles.padding]}
                                        onPress={() => {
                                            props.readySet(0, selectedItems)
                                        }}>
                                        <Image source={require('./assets/copy.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.pill,
                                        styles.padding]}
                                        onPress={() => { props.readySet(1, selectedItems) }}>
                                        <Image source={require('./assets/move.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.pill,
                                        styles.text,
                                        styles.padding]}
                                        onPress={() => { shareFiles() }}>
                                        <Image source={require('./assets/share.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.pill,
                                        styles.padding]}
                                        onPress={() => { props.readySet(3, selectedItem) }}>
                                        <Image source={require('./assets/rename.png')} />
                                    </TouchableOpacity>
                                    <Text style={{ color: secondaryColor }}>  |  </Text>
                                </> :
                                <>
                                    <TouchableOpacity
                                        style={[styles.pill,
                                        styles.padding]}
                                        onPress={() => {
                                            props.setFavouritesModal(1)
                                        }}>
                                        <Image source={require('./assets/favourite.png')} />
                                    </TouchableOpacity>
                                </>
                            }
                            {/* <TouchableOpacity
                                                        style={[styles.pill,
styles.text,
styles.padding]}
                                                        onPress={() => { loadDetails(selectedItems[0]["path"]) }}>
                                                        <Image source={require('./assets/about.png')} />
                                                    </TouchableOpacity> */}

                            <TouchableOpacity
                                style={[styles.pill,
                                styles.padding]}
                                onPress={() => {
                                    setSearchFlag(1)
                                }}>
                                <Image source={require('./assets/search.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.pill,
                                styles.padding]}
                                onPress={() => {
                                    setContextMenu(1)
                                }}>
                                <Image source={require('./assets/horzmenu.png')} />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View >
        </View >)
}
export default Window