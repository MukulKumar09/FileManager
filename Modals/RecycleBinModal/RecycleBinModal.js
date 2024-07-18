import { Text, Pressable, View, Modal } from "react-native";
import { useSelector, useDispatch } from "react-redux"
import styles, { backgroundColor } from "../../styles";
import MaterialIcon from "../../Common/MaterialIcon/MaterialIcon";
import useIcon from "../../Hooks/useIcon";
import { useState } from "react";
import useRangeSelect from "../../Hooks/useRangeSelect";
import useDeleteItems from "../../Hooks/useDeleteItems";

export default function RecycleBinModal() {
    const dispatch = useDispatch()
    const state = {
        tabs: useSelector(state => state.tabs),
        currentTab: useSelector(state => state.currentTab),
        recycleBin: useSelector(state => state.recycleBin),
        deletePromiseResolver: useSelector(state => state.deletePromiseResolver),
        clipboardItems: useSelector(state => state.clipboardItems),
    }
    const [selectedItems, setSelectedItems] = useState([])

    const selectItem = (item) => {
        if (selectedItems.some(selectedItem => selectedItem["path"] === item["path"])) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.path !== item["path"]))
        }
        else {
            setSelectedItems([...selectedItems, item])
        }
    }

    const handlePress = (item) => {
        selectItem(item)
    }

    const handleLongPress = (item) => {
        if (selectedItems.length > 0) {
            setSelectedItems(useRangeSelect(state.recycleBin, [...selectedItems], item))
        } else {
            selectItem(item)
        }
    }
    return (<Modal
        onRequestClose={() => dispatch({
            type: "RECYCLEBINMODAL"
        })}
        visible={state.recycleBin ? true : false}
        transparent={true}
    >
        <Pressable
            onPress={() => dispatch({
                type: "RECYCLEBINMODAL"
            })} style={[styles.modalBackground]}
        />

        <View style={[
            styles.pill,
            styles.modal,
            {
                backgroundColor: backgroundColor,
                position: 'absolute',
                left: 10,
                right: 10,
                bottom: 10,
            }
        ]}>
            <View style={
                [
                    styles.rowLayout,
                    styles.padding,
                    { justifyContent: 'space-between', width: '100%' },
                ]
            }>
                <View style={
                    [
                        styles.rowLayout,
                        styles.bigGap
                    ]
                }>
                    <MaterialIcon name="delete-empty-outline" />
                    <View>
                        <Text style={[
                            styles.text,
                            styles.headingText
                        ]}>Recycle Bin</Text>
                        {selectedItems.length > 0 && <Text style={
                            [
                                styles.text,
                                styles.smallText,
                                styles.textDisabled,
                            ]
                        }>
                            {selectedItems.length} items selected
                        </Text>
                        }
                    </View>
                </View>
                <View style={
                    [
                        styles.rowLayout,
                        styles.bigGap,
                    ]
                }>
                    <Pressable
                        onPress={() => {
                            dispatch({
                                type: "CLEARRB"
                            })
                            setSelectedItems([])
                        }
                        }>
                        <MaterialIcon name="delete-off-outline" color="white" />
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            setSelectedItems(state.recycleBin)
                        }
                        }>
                        <MaterialIcon name="select-all" color="white" />
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            setSelectedItems([])
                        }}>
                        <MaterialIcon name="select-off" color="white" />
                    </Pressable>
                </View>
            </View>
            <View style={[styles.divider]} />
            {state.recycleBin.length == 0 &&
                <Text style={[styles.text,
                styles.textDisabled, styles.padding]}>No items</Text>
            }
            <View style={{ width: '100%' }}>
                {state.recycleBin.map((item, i) => {
                    return (
                        <Pressable
                            key={i}
                            onPress={() => handlePress(item)}
                            onLongPress={() => handleLongPress(item)}
                            style={
                                [
                                    styles.rowLayout,
                                    styles.padding,
                                    styles.bigGap,
                                    styles.wide,
                                    selectedItems.some(selectItem => item["path"] === selectItem["path"]) && styles.listItemHighlight,
                                ]
                            }
                        >
                            <View style={{ width: 30, }}>
                                {useIcon(item["fileType"])}
                            </View>
                            <Text style={[styles.text]}>{item["name"]}</Text>
                        </Pressable>
                    )
                }
                )}
            </View>
            <View style={[styles.divider]} />
            <View style={
                [
                    styles.rowLayout,
                    styles.padding,
                    styles.bigGap
                ]
            }>
                <Pressable
                    onPress={async () => {
                        dispatch({
                            type: "DELETEMODAL",
                            payload: selectedItems
                        })
                        let deleteDecision = await new Promise((resolve) => {
                            dispatch({
                                type: "DELETEPROMISERESOLVER",
                                payload: resolve
                            })
                        })
                        if (deleteDecision) {
                            dispatch({
                                type: "DELETEMODAL",
                                payload: 0
                            })
                            setSelectedItems([])
                            useDeleteItems(state, dispatch, selectedItems)
                        } else {
                            dispatch({
                                type: "DELETEMODAL",
                                payload: 0
                            })
                        }
                    }}
                    style={[styles.pill,
                    styles.centered,
                    styles.wide,
                    styles.padding
                        , {
                        borderColor: "#FF5252",
                        borderWidth: 2,
                        borderStyle: 'solid'
                    }]}>
                    <Text style={[styles.text]}>Delete</Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        let tempRecycleBin = [...state.recycleBin]
                        selectedItems.map((item) =>
                            tempRecycleBin = tempRecycleBin.filter((rbItem) =>
                                rbItem["path"] !== item["path"]
                            )
                        )
                        dispatch({
                            type: "SETRECYCLEBIN",
                            payload: tempRecycleBin
                        })
                        setSelectedItems([])
                    }
                    }
                    style={[styles.pill,
                    styles.centered,
                    styles.pillHighlight,
                    styles.wide,
                    styles.padding]}>
                    <Text style={[styles.text]}>Restore</Text>
                </Pressable>
            </View>
        </View>
    </Modal>)
}