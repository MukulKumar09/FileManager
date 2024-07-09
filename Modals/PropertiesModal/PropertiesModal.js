import { Text, Pressable, View, Image, Modal } from "react-native";
import styles, { backgroundColor } from "../../styles";
import MaterialIcon from "../../Common/MaterialIcon/MaterialIcon";
import { useDispatch, useSelector } from "react-redux";
import useNiceBytes from "../../Hooks/useNiceBytes";
import RNFS from 'react-native-fs';
import { useState } from "react";

export default function PropertiesModal() {
    const [size, setSize] = useState(0)
    const [type, setType] = useState("")
    const [created, setCreated] = useState("")
    const [modified, setModified] = useState("")

    const dispatch = useDispatch()
    const state = {
        propertiesModal: useSelector(state => state.propertiesModal)
    }

    let firstItem = state.propertiesModal[0]
    const itemsCount = state.propertiesModal.length
    let name = ""
    let path = firstItem["path"].split("/")
    path.pop()
    path = path.join("/")

    if (itemsCount == 1) {
        name = firstItem["name"]
        const getStat = async () => {
            console.log("Asdas")
            let stat = await RNFS.stat(firstItem["path"])
            setCreated(stat["ctime"].toString())
            setModified(stat["mtime"].toString())
            if (firstItem["isFile"]) {
                setSize(stat["size"])
                setType(firstItem["fileType"])
            }
            else {
                setType("Folder")
            }
        }
        getStat()
    } else {
        name = "[Multiple items...]"
        const getStatsAsync = async () => {
            let tempSize = 0
            let tempType = []
            let tempFileCount = 0
            let tempFolderCount = 0
            await Promise.all(
                state.propertiesModal.map(async item => {
                    if (item["isFile"]) {
                        tempType.push(item["fileType"])
                        tempFileCount = tempFileCount + 1
                        let stat = await RNFS.stat(item["path"])
                        tempSize = parseInt(tempSize) + parseInt(stat["size"])
                    } else {
                        tempType.push("Folders")
                        tempFolderCount = tempFolderCount + 1
                    }
                })
            ).then(() => {
                setSize(tempSize)
                if (tempType.every(val => val === tempType[0]))
                    setType(tempType[0])
                else
                    setType(tempFileCount + " files, " + tempFolderCount + " folders")
            })
        }
        getStatsAsync()
    }
    return (
        <Modal
            onRequestClose={() =>
                dispatch({
                    type: "PROPERTIESMODAL",
                    payload:
                        0,
                })
            }
            visible={state.propertiesModal ? true : false}
            transparent={true}
        >
            <Pressable
                onPress={() =>
                    dispatch({
                        type: "PROPERTIESMODAL",
                        payload:
                            0,
                    })
                }
                style={[styles.modalBackground]}
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
                        styles.bigGap,
                        styles.padding
                    ]
                }>
                    <MaterialIcon name="details" />
                    <Text style={[
                        styles.text,
                        styles.headingText
                    ]}>Properties</Text>
                </View>
                <View style={[styles.divider]} />
                <View style={[
                    styles.padding,
                    styles.bigGap,
                    { width: '100%' }
                ]
                }>
                    {state.propertiesModal.length > 1 ?
                        <Text
                            style={
                                [
                                    styles.text,
                                    styles.textDisabled,
                                ]
                            }>
                            {state.propertiesModal.length} items selected
                        </Text>
                        :
                        <>
                        </>
                    }
                    <View style={[styles.rowLayout]}>
                        <Text style={[styles.text, styles.textDisabled, { width: '40%' }]}>Name: </Text>
                        {itemsCount > 1 ?
                            <Text style={[styles.text, styles.wide]}>[Multiple items...]</Text>
                            :
                            <Text style={[styles.text, styles.wide]}>{name}</Text>
                        }
                    </View>
                    <View style={[styles.rowLayout]}>
                        <Text style={[styles.text, styles.textDisabled, { width: '40%' }]}>Type: </Text><Text style={[styles.text, styles.wide]}>{type}</Text>
                    </View>
                    <View style={[styles.rowLayout]}>
                        <Text style={[styles.text, styles.textDisabled, { width: '40%' }]}>Size: </Text><Text style={[styles.text, styles.wide]}>{useNiceBytes(size)}</Text>
                    </View>
                    <View style={[styles.rowLayout]}>
                        <Text style={[styles.text, styles.textDisabled, { width: '40%' }]}>Path: </Text><Text style={[styles.text, styles.wide]}>{path}</Text>
                    </View>
                    {itemsCount > 1 ?
                        null :
                        <>
                            <View style={[styles.rowLayout]}>
                                <Text style={[styles.text, styles.textDisabled, { width: '40%' }]}>Created Date: </Text><Text style={[styles.text, styles.wide]}>{created}</Text>
                            </View>
                            <View style={[styles.rowLayout]}>
                                <Text style={[styles.text, styles.textDisabled, { width: '40%' }]}>Modified Date: </Text><Text style={[styles.text, styles.wide]}>{modified}</Text>
                            </View>
                        </>
                    }
                </View>
                <View style={[
                    styles.padding,
                    styles.mediumGap,
                    { width: '100%' }
                ]
                }>
                    <Pressable
                        onPress={() => {
                            dispatch({
                                type: "PROPERTIESMODAL",
                                payload:
                                    0,
                            })
                        }
                        }
                        style={[
                            styles.pill,
                            styles.centered,
                            styles.wide,
                            styles.padding,
                            {
                                width: '100%'
                            }
                        ]}>
                        <Text style={[styles.text]}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}