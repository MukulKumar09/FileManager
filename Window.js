import { useContext, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { CombinedReducersContext, CombinedDispatchContext } from "./Context/Context"
import Share from 'react-native-share';
import { backgroundColor } from "./styles";
import FilesList from "./Features/FilesList/FilesList";
import SortModal from "./Modals/SortModal/SortModal";
import WindowToolBar from "./Features/WindowToolBar/WindowToolBar";
import useStageItems from "./Hooks/useStageItems";
import useFileHandler from "./Hooks/useFileHandler";
import useSort from "./Hooks/useSort";
import useRangeSelect from "./Hooks/useRangeSelect";
import useCache from "./Hooks/useCache";

const Window = (props) => {
    const state = useContext(CombinedReducersContext)
    const dispatch = useContext(CombinedDispatchContext)
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


    useEffect(() => { //first
        if (state.tabs[props.index]["path"] !== "Home" && state.cache[state.tabs[props.index]["path"]] == undefined) {
            useCache(dispatch, state.tabs[state.currentTab]["path"])
        }
    }, [state.tabs[state.currentTab]["path"]])

    useEffect(() => {
        if (state.cache[state.tabs[props.index]["path"]])
            setFilesList(useSort(state.cache[state.tabs[props.index]["path"]], sortType, sortOrder))
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
    }, [state.functionId])

    const handlePress = (item) => {
        if (selectionFlag)
            selectItem(item)
        else
            useFileHandler(state, dispatch, item)
    }

    const handleLongPress = (item) => {
        if (selectionFlag) {
            setSelectedItem(item)
            setSelectedItems(useRangeSelect(filesList, [...selectedItems], item))
        } else {
            selectItem(item)
        }
    }

    const handleSort = () => {
        setSortModal(0)
        setFilesList(useSort(state.cache[state.tabs[props.index]["path"]], sortType, sortOrder))
    }

    const selectItem = (item) => {
        setSelectedItem(item)
        if (selectionFlag)
            if (selectedItems.includes(item))
                setSelectedItems(selectedItems.filter((i) => i.path !== item["path"]))
            else
                setSelectedItems([...selectedItems, item])
        else
            setSelectedItems([item])
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