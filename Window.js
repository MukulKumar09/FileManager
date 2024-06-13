import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { Text, TextInput, TouchableOpacity, View, FlatList, Image, ScrollView, Modal, Dimensions, TouchableWithoutFeedback, ToastAndroid, VirtualizedList } from "react-native";
import Share from 'react-native-share';
import styles, { backgroundColor, grey, highlightColor, secondaryColor } from "./styles";
import RNFS from 'react-native-fs';

const Window = forwardRef((props, ref) => {
    console.log("window render")
    const [currPath, setCurrPath] = useState(props.initPath)
    const [filesList, setFilesList] = useState([])
    const [properties, setProperties] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [selectedItem, setSelectedItem] = useState([])
    const [selectionFlag, setSelectionFlag] = useState(0)
    const [sortModal, setSortModal] = useState(0)
    const [sortType, setSortType] = useState(1)
    const [sortOrder, setSortOrder] = useState(0)
    const [searchFlag, setSearchFlag] = useState(0)
    const [favItemsFlag, setFavItemsFlag] = useState()
    const [contextMenu, setContextMenu] = useState(0)
    const [vIndex, setZIndex] = useState("flex")

    const [breadCrumbs, setBreadCrumbs] = useState([])
    useImperativeHandle(ref, () => ({
        rerender: (visibility) => {
            setZIndex(visibility)
        }
    }));


    const loadDetails = async (path) => {
        let result = await RNFS.stat(path)
        console.log(result)
        setProperties(result)
    }

    useEffect(() => { //first
        props.buildCache(currPath, 0)
        setBreadCrumbs(props.breadCrumbsTabName(currPath, props.index))
    }, [currPath])

    useEffect(() => {
        if (props.mainCache[currPath] !== undefined) {
            handleSort(props.mainCache[currPath])
        }
    }, [props.mainCache[currPath]])

    useEffect(() => {
        if (selectedItems.length == 0)
            setSelectionFlag(0)
        else
            setSelectionFlag(1)
    }, [selectedItems])

    const handlePress = (item) => {
        if (selectionFlag)
            selectItem(item)
        else
            if (item.isDirectory())
                setCurrPath(item["path"])
            else
                props.fileHandler(item), setSelectedItem(item)
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

    const deselectAll = () => {
        setSelectedItems([])
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


    const Icon = (item) => {
        let ext = ""
        if (item.isFile()) {
            ext = item.name.split(".").pop()
        } else {
            return <Image source={require('./assets/folder.png')} />
        }
        switch (ext) {
            case "mp3":
                return (<Image source={require('./assets/music.png')} />)
            case "exe":
                return (<Image source={require('./assets/win.png')} />)
            default:
                return (<Text style={[styles.text,
                styles.smallDarkText]}>{ext}</Text>)
        }
    }
    return (
        <View style={
            {
                backgroundColor: backgroundColor,
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                display: vIndex
            }
        }>
            {favItemsFlag ?
                <Modal
                    transparent={true}>
                    <TouchableWithoutFeedback
                        onPress={() => setFavItemsFlag(0)}
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
                        styles.headingText]}>Favourites</Text>
                        <View style={[styles.divider]} />
                        <View style={[styles.mediumGap, { flexDirection: 'column', width: '100%' }]}>
                            {Object.keys(props.favItems).length > 0 && props.favItems.map(
                                (item, i) =>
                                    <View
                                        key={i}
                                        style={[
                                            styles.rowLayout,
                                            styles.pill
                                        ]}>
                                        <TouchableOpacity
                                            style={[
                                                styles.rowLayout,
                                                styles.bigGap,
                                                styles.wide,
                                                styles.padding
                                            ]}
                                            onPress={() => {
                                                setCurrPath(item["path"])
                                                setFavItemsFlag(0)
                                            }}
                                        ><Image style={{ height: 20, width: 20 }} source={require('./assets/folder.png')} />
                                            <Text style={[styles.text]}>{item["title"]}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.padding
                                            ]}
                                            onPress={() => {
                                                let tempFavItems = [...props.favItems]
                                                tempFavItems.splice(i, 1)
                                                props.setFavItems(tempFavItems)
                                            }}
                                        >
                                            <Image style={{ height: 8, width: 8 }} source={require('./assets/close.png')} />
                                        </TouchableOpacity>
                                    </View>
                            )}
                            <View style={[styles.divider]} />
                            <TouchableOpacity
                                style={[
                                    styles.rowLayout,
                                    styles.pill,
                                    styles.bigGap,
                                    styles.wide,
                                    styles.padding
                                ]}
                                onPress={() => {
                                    let title = currPath.split("/").pop()
                                    let newFavItem = {
                                        'title': title,
                                        "path": currPath
                                    }
                                    if (props.favItems.find((item) => item.path == currPath) == undefined) {
                                        props.setFavItems([...props.favItems, newFavItem])
                                    } else {
                                        ToastAndroid.showWithGravity(
                                            "Item already exists",
                                            ToastAndroid.SHORT,
                                            ToastAndroid.CENTER,
                                        );
                                    }
                                }}
                            ><Image source={require('./assets/newfolder.png')} />
                                <Text style={[styles.text]}>Add Current Folder</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal >
                : null
            }
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
                        <View style={[styles.mediumGap, { flexDirection: 'column', width: '100%' }]}>
                            <TouchableOpacity
                                style={[
                                    styles.pill,
                                    sortType == 0 ? styles.pillHighlight : null,
                                    styles.padding]}
                                onPress={() => setSortType(0)}
                            >
                                <Text style={[styles.text]}>Name</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.pill,
                                    sortType == 1 ? styles.pillHighlight : null,
                                    styles.padding]}
                                onPress={() => setSortType(1)}
                            >
                                <Text style={[styles.text]}>Type</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.pill,
                                    sortType == 2 ? styles.pillHighlight : null,
                                    styles.padding]}
                                onPress={() => setSortType(2)}
                            >
                                <Text style={[styles.text]}>Date</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.pill,
                                    sortType == 3 ? styles.pillHighlight : null,
                                    styles.padding]}
                                onPress={() => setSortType(3)}
                            >
                                <Text style={[styles.text]}>Size</Text>
                            </TouchableOpacity>
                            <View style={[styles.divider]} />
                            <TouchableOpacity
                                style={[
                                    styles.pill,
                                    sortOrder == 1 ? styles.pillHighlight : null,
                                    styles.padding]}
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
            {filesList.length == 0 ?
                <View style={[
                    styles.wide,
                    styles.padding,
                    {
                        alignItems: 'center'
                    }
                ]}>
                    <Text style={[styles.text]}>Nothing to show</Text>
                </View> :
                <VirtualizedList
                    onRefresh={() => {
                        props.buildCache(currPath, 1)
                        setSelectedItems([])
                        setSelectedItem([])
                    }
                    }
                    refreshing={false}
                    data={filesList}
                    // data={filesList}
                    extraData={filesList}
                    keyExtractor={item => item.path}
                    getItemCount={(data) => data.length}
                    getItem={(data, index) => data[index]}
                    maxToRenderPerBatch={5}
                    windowSize={5}
                    updateCellsBatchingPeriod={100}
                    renderItem={({ item }) =>
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
                                {Icon(item)}
                                <Text>{item["name"]}</Text>
                            </View>
                            {item.isFile() ?
                                <Text style={[styles.text,
                                styles.smallDarkText]}>
                                    {item["size"]}
                                </Text>
                                : null
                            }
                        </TouchableOpacity>
                    }
                />
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
                        {/* <View
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
                            ><Image source={require('./assets/archive.png')} />
                                <Text style={[styles.text]}>Clipboard</Text>
                            </TouchableOpacity>
                        </View> */}
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
                                onPress={() => {
                                    props.buildCache(currPath, 1)
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
                                onPress={() => { props.newItem(1, currPath) }}
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
                                onPress={() => { props.newItem(0, currPath) }}
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
                        }}>{selectedItems.length} items selected</Text>
                        <Text style={[
                            styles.text
                        ], {
                            color: '#979899',
                            fontSize: 10,
                            textDecorationLine: 'underline'
                        }} onPress={() => deselectAll()}>Deselect All</Text>
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
                                        onPress={() => setCurrPath("Home")}
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
                                                    onPress={() => setCurrPath(folder["path"])}
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
                        <Text style={{ color: secondaryColor }}>  |  </Text>
                        <TouchableOpacity
                            onPress={() => {
                                let tempCurrPath = currPath.split("/")
                                tempCurrPath.pop()
                                tempCurrPath = tempCurrPath.join("/")
                                setCurrPath(tempCurrPath)
                            }}
                        >
                            <Text
                                style={[styles.smallPill,
                                styles.smallText,
                                styles.text,
                                styles.textDisabled]}
                            >Back</Text>
                        </TouchableOpacity>
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
                                        handleSort(props.mainCache[currPath])
                                    else
                                        handleSort(props.mainCache[currPath].filter((item) => item["name"].includes(text)))
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
                                    handleSort(props.mainCache[currPath])
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
                            {selectionFlag ?
                                <>
                                    <TouchableOpacity
                                        style={[styles.pill,
                                        styles.padding]}
                                        onPress={() => { props.readySet(2, selectedItems, currPath) }}>
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
                                            setFavItemsFlag(1)
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
});
export default Window