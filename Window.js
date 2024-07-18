import { useEffect, useMemo, useState } from "react";
import { BackHandler, View } from "react-native";
import RNFS from 'react-native-fs';
import { useSelector, useDispatch } from "react-redux";
import Share from 'react-native-share';
import FilesList from "./Features/FilesList/FilesList";
import SortModal from "./Modals/SortModal/SortModal";
import WindowToolBar from "./Features/WindowToolBar/WindowToolBar";
import useStageItems from "./Hooks/useStageItems";
import useFileHandler from "./Hooks/useFileHandler";
import useSort from "./Hooks/useSort";
import useRangeSelect from "./Hooks/useRangeSelect";
import useCache from "./Hooks/useCache";
import useOpenExternally from "./Hooks/useOpenExternally";
import useNavigateParent from "./Hooks/useNavigateParent";

const Window = (props) => {
    const dispatch = useDispatch()
    const state = {
        tabs: useSelector(state => state.tabs),
        currentTab: useSelector(state => state.currentTab),
        clipboardItems: useSelector(state => state.clipboardItems),
        tabCounter: useSelector(state => state.tabCounter),
        cache: useSelector(state => state.cache["Home"]),
        functionId: useSelector(state => state.functionId),
        mediaBox: useSelector(state => state.mediaBox),
        recycleBin: useSelector(state => state.recycleBin),
    }
    const [filesList, setFilesList] = useState([])
    const [searchModal, setSearchModal] = useState(0)
    //selection
    const [selectedItem, setSelectedItem] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [selectionFlag, setSelectionFlag] = useState(0)
    //sorting
    const [sortModal, setSortModal] = useState(0)
    let sortType = 1
    let sortOrder = 0

    const tabPath = useSelector(state => state.tabs[props.index]["path"])
    const cache = useSelector(state => state.cache[tabPath])

    const functionId = (payload) => {
        dispatch({
            type: "FUNCTIONID",
            payload: payload
        })
    }

    useEffect(() => {
        if (state.currentTab == props.index) {
            const backAction = () => {
                if (state.tabs[props.index]["path"] == "Home") {
                    return false
                }
                else {
                    setSelectedItem({ path: state.tabs[props.index]["path"] })
                    useNavigateParent(state, dispatch)
                }
                return true;
            };
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction,
            );
            return () => backHandler.remove();
        }
    }, [state.tabs, state.currentTab, state.cache])

    useEffect(() => { //first
        if (tabPath !== "Home" && cache == undefined) {
            useCache(dispatch, tabPath)
        }
    }, [tabPath])

    useEffect(() => {
        if (cache) {
            handleSort(cache)
            let tempSelectedItems = [...selectedItems].filter(item => {
                return cache.some(cacheItem => cacheItem.path === item.path)
            })
            setSelectedItems(tempSelectedItems)
        }
    }, [cache])


    useEffect(() => {
        if (selectedItems.length == 0)
            setSelectionFlag(0)
        else
            setSelectionFlag(1)
    }, [selectedItems])



    useEffect(() => {
        if (state.currentTab == props.index && state.functionId > -1) {
            switch (state.functionId) {
                case 0:
                case 1: { //copy, move
                    if (selectedItems.length == 0) {
                        dispatch({
                            type: "TOAST",
                            payload:
                                "No items selected",
                        })
                        functionId(-1)
                    }
                    else {
                        const checkExists = async () => {
                            let tempSelectedItems = [...selectedItems]
                            for (let i = 0; i < tempSelectedItems.length; i++) {
                                if (await RNFS.exists(tempSelectedItems[i]["path"])) {
                                    let itemStat = await RNFS.stat(tempSelectedItems[i]["path"])
                                    tempSelectedItems[i]["size"] = itemStat["size"]
                                }
                            }
                            dispatch({
                                type: 'COPYTOCB',
                                payload: tempSelectedItems
                            })
                            dispatch({
                                type: "OPERATIONTYPE",
                                payload: state.functionId,
                            })
                            dispatch({
                                type: "OPERATIONSOURCE",
                                payload: state.tabs[state.currentTab]["path"],
                            })
                            dispatch({
                                type: "TOAST",
                                payload: tempSelectedItems.length + " item(s) " + (state.functionId ? "moving" : "copied"),
                            })
                        }
                        checkExists()
                        functionId(-1)
                    }
                    break
                }
                case 2: { //delete
                    if (selectedItems.length == 0) {
                        dispatch({
                            type: "TOAST",
                            payload:
                                "No items selected",
                        })
                        functionId(-1)
                    }
                    else {
                        let items = []
                        selectedItems.map((item) => {
                            let tempItem = {
                                name: item["name"],
                                path: item["path"],
                                fileType: item["fileType"],
                                size: item["size"]
                            }
                            if (state.recycleBin.find((item) => item["path"] == tempItem["path"]) == undefined) {
                                items.push(tempItem)
                            }
                        })
                        dispatch({
                            type: "ADDTORECYCLEBIN",
                            payload: items
                        })
                        dispatch({
                            type: "TOAST",
                            payload: selectedItems.length + ' item(s) added to Recycle Bin'
                        })
                        functionId(-1)
                    }
                    break
                }
                case 3: { //rename
                    if (selectedItem.length == 0) {
                        dispatch({
                            type: "TOAST",
                            payload:
                                "No items selected",
                        })
                    }
                    else {
                        useStageItems(state, dispatch, selectedItem)
                    }
                    functionId(-1)
                    break
                }
                case 8: {
                    if (selectedItem.length == 0 || selectedItem["isDirectory"]) {
                        dispatch({
                            type: "TOAST",
                            payload:
                                "No items selected",
                        })
                    } else {
                        useOpenExternally(dispatch, selectedItem)
                    }
                    functionId(-1)
                    break
                }
                case 9: {
                    if (selectedItems.length == 0) {
                        dispatch({
                            type: "TOAST",
                            payload:
                                "No items selected",
                        })
                    } else {
                        dispatch({
                            type: "PROPERTIESMODAL",
                            payload:
                                selectedItems,
                        })
                    }
                    functionId(-1)
                    break
                }
                case 10: { //open as
                    if (selectedItem.length == 0 || selectedItem["isDirectory"]) {
                        dispatch({
                            type: "TOAST",
                            payload:
                                "No items selected",
                        })
                    } else {
                        dispatch({
                            type: "OPENASMODAL",
                            payload: selectedItem
                        })
                    }
                    functionId(-1)
                    break
                }
                default: {
                    useStageItems(state, dispatch, selectedItem)
                    functionId(-1)
                }
            }
        }
    }, [state.functionId])

    useEffect(() => {
        if (state.currentTab == props.index)
            useStageItems(state, dispatch, selectedItems)
    }, [state.clipboardItems])

    const handlePress = (item) => {
        if (selectionFlag)
            selectItem(item)
        else
            useFileHandler(state, dispatch, item)
    }

    const handleLongPress = (item) => {
        if (selectionFlag) {
            setSelectedItems(useRangeSelect(filesList, [...selectedItems], item))
        } else {
            selectItem(item)
        }
    }

    const handleSortProps = (type, order) => {
        sortType = type
        sortOrder = order
        handleSort(filesList)
    }
    const handleSort = (data) => {
        setSortModal(0)
        setFilesList(useSort(data, sortType, sortOrder))
    }

    const selectItem = (item) => {
        setSelectedItem(item)
        if (selectionFlag) {
            if (selectedItems.some(selectedItem => selectedItem["path"] === item["path"]))
                setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.path !== item["path"]))

            else
                setSelectedItems([...selectedItems, item])
        } else {
            setSelectedItems([item])
        }
    }

    const shareFiles = async () => {
        try {
            let filesToShare = [];
            for (let i = 0; i < selectedItems.length; i++) {
                if (selectedItems[i].isFile) {
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

    return (
        <View style={{ flex: 1 }}>
            {Boolean(sortModal) &&
                <SortModal
                    sortModal={sortModal}
                    sortType={sortType}
                    sortOrder={sortOrder}
                    setSortModal={setSortModal}
                    handleSortProps={handleSortProps}
                />
            }
            {
                useMemo(() => {
                    return (
                        <FilesList
                            handlePress={handlePress}
                            handleLongPress={handleLongPress}
                            setSelectedItems={setSelectedItems}
                            setSelectedItem={setSelectedItem}
                            finalList={filesList}
                            selectedItems={selectedItems}
                            selectedItem={selectedItem}
                        />
                    )
                }, [filesList, selectedItem, selectedItems, selectionFlag])
            }
            <WindowToolBar
                index={props.index}
                selectionFlag={selectionFlag}
                selectedItems={selectedItems}
                filesList={filesList}
                searchModal={searchModal}
                setSelectedItems={setSelectedItems}
                setSelectedItem={setSelectedItem}
                setSortModal={setSortModal}
                setSearchModal={setSearchModal}
                handleSort={handleSort}
            />
        </View>)
}
export default Window