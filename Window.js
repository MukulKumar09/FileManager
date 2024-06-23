import { useContext, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { CombinedReducersContext, CombinedDispatchContext } from "./Context/Context"
import Share from 'react-native-share';
import { backgroundColor } from "./styles";
import FilesList from "./Features/FilesList/FilesList";
import SortModal from "./Modals/SortModal/SortModal";
import WindowToolBar from "./Features/WindowToolBar/WindowToolBar";
import CacheHandler from "./Handlers/CacheHandler";
import useStageItems from "./Hooks/useStageItems";

// const Window = forwardRef((props, ref) => {
const Window = (props) => {
    const state = useContext(CombinedReducersContext)
    const dispatch = useContext(CombinedDispatchContext)
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
        if (state.tabs[props.index]["path"] !== "Home" && state.cache[state.tabs[props.index]["path"]] == undefined) {
            console.log("path : ", state.tabs[props.index]["path"])
            const buildCache = async () => {
                dispatch({
                    type: "UPDATECACHE",
                    payload: {
                        key: state.tabs[state.currentTab]["path"],
                        value: await CacheHandler(state.tabs[state.currentTab]["path"])
                    }
                })
            }
            buildCache()
        }
        setBreadCrumbs(props.breadCrumbsTabName()) //set breadcrumbs, tabname
    }, [state.tabs[state.currentTab]["path"]])

    useEffect(() => {
        if (state.cache[state.tabs[props.index]["path"]] !== undefined)
            handleSort(state.cache[state.tabs[props.index]["path"]])
    }, [state.cache[state.tabs[props.index]["path"]]])

    useEffect(() => {
        if (selectedItems.length == 0)
            setSelectionFlag(0)
        else
            setSelectionFlag(1)
    }, [selectedItems])

    useEffect(() => {
        if (state.currentTab == props.index && state.functionId > -1)
            useStageItems(state, dispatch, state.functionId, [3, 4].includes(state.functionId) ? selectedItem : selectedItems)
        // props.StageItems(state.functionId, [3, 4].includes(state.functionId) ? selectedItem : selectedItems)
    }, [state.functionId])

    const handlePress = (item) => {
        if (selectionFlag) {
            selectItem(item)
        }
        else {
            if (item.isDirectory()) {
                dispatch({
                    type: "MODIFYTABPATH",
                    payload: {
                        tabId: state.currentTab,
                        value: item["path"]
                    }
                })
                dispatch({
                    type: "MODIFYTABNAME",
                    payload: {
                        tabId: state.currentTab,
                        value: item["name"]
                    }
                })
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
        if (selectionFlag)
            if (selectedItems.includes(item))
                setSelectedItems(selectedItems.filter((i) => i.path !== item["path"]))
            else
                setSelectedItems([...selectedItems, item])
        else
            setSelectedItems([item])
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

    return (
        <View style={
            {
                backgroundColor: backgroundColor,
                height: '100%',
                display: state.currentTab == props.index ? "flex" : "none"
            }
        }>
            {sortModal ?
                <SortModal
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
                            setSelectedItems={setSelectedItems}
                            setSelectedItem={setSelectedItem}
                            finalList={filesList}
                            selectedItems={selectedItems}
                            selectedItem={selectedItem}
                            handlePress={handlePress}
                            handleLongPress={handleLongPress}
                            Icon={props.Icon}
                        />
                    )
                }, [filesList, selectedItem, selectedItems, selectionFlag])
            }
            <WindowToolBar
                index={props.index}
                selectionFlag={selectionFlag}
                selectedItems={selectedItems}
                filesList={filesList}
                breadCrumbs={breadCrumbs}
                searchFlag={searchFlag}
                setSelectedItems={setSelectedItems}
                setSelectedItem={setSelectedItem}
                setSortModal={setSortModal}
                setSearchFlag={setSearchFlag}
                handleSort={handleSort}
            />
        </View>)
}
export default Window