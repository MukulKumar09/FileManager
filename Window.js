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
        clipboardItems: useSelector(state => state.clipboardItems),
        currentTab: useSelector(state => state.currentTab),
        tabCounter: useSelector(state => state.tabCounter),
        cache: useSelector(state => state.cache["Home"]),
        functionId: useSelector(state => state.functionId),
        mediaBox: useSelector(state => state.mediaBox)
    }
    const [filesList, setFilesList] = useState([])
    const [searchModal, setSearchModal] = useState(0)
    //selection
    const [selectedItem, setSelectedItem] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [selectionFlag, setSelectionFlag] = useState(0)
    //sorting
    const [sortModal, setSortModal] = useState(0)
    const [sortType, setSortType] = useState(1)
    const [sortOrder, setSortOrder] = useState(0)

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
                if (state.tabs[state.currentTab]["path"] == "Home")
                    return false
                else
                    useNavigateParent(state, dispatch)
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
            setFilesList(useSort(cache, sortType, sortOrder))
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
                        useStageItems(state, dispatch, selectedItems)
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

    const handleSort = (items) => {
        setSortModal(0)
        setFilesList(useSort(items, sortType, sortOrder))
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
            {sortModal ?
                <SortModal
                    sortModal={sortModal}
                    sortType={sortType}
                    sortOrder={sortOrder}
                    setSortModal={setSortModal}
                    setSortType={setSortType}
                    handleSort={handleSort}
                    setSortOrder={setSortOrder}
                />
                : null
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