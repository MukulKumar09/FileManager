import { useEffect, useMemo, useState } from "react"
import { ScrollView, Text, View, TouchableOpacity, BackHandler, Image, ActivityIndicator, ToastAndroid } from "react-native"
import RNFS from 'react-native-fs';
import styles from "./styles"
import Window from "./Window"
function App() {
    const [tabs, setTabs] = useState({})
    const [lastTabKey, setLastTabKey] = useState(0)
    const [currTab, setCurrTab] = useState(0)
    const [operationTab, setOperationTab] = useState(-1)
    const [operationType, setOperationType] = useState(-1)
    const [progressType, setProgressType] = useState(-1)
    const [addedItems, setAddedItems] = useState([])
    const [removedItems, setRemovedItems] = useState([])

    const [bottomSheet, setBottomSheet] = useState(1)

    const addTab = () => {

        let tempTabs = { ...tabs }
        if (Object.keys(tabs).length > 0) {
            tempTabs[currTab]["visible"] = 0
        }
        tempTabs =
        {
            ...tempTabs,
            ...{
                [lastTabKey]: {
                    name: 'Default',
                    path: tabs[currTab] ? tabs[currTab]["path"] : RNFS.ExternalStorageDirectoryPath,
                    selectedItems: []
                }
            }
        }
        setTabs(tempTabs)
        setCurrTab(lastTabKey.toString())
        setLastTabKey(lastTabKey + 1);
    }
    useEffect(() => addTab(), [])
    const deleteTab = (tabId) => {
        let allTabs = Object.keys(tabs)
        if (allTabs.length > 1) {
            let tempTabs = { ...tabs }
            tempTabs[currTab]["visible"] = 0
            let tabAdd = allTabs.indexOf(tabId)
            let actTab;
            if (allTabs[tabAdd + 1] == undefined) { //last
                actTab = allTabs[tabAdd - 1]
            } else { //first,mid
                actTab = allTabs[tabAdd + 1]
            }
            tempTabs[actTab]["visible"] = 1
            delete tempTabs[tabId]
            setTabs(tempTabs)
            setCurrTab(actTab.toString())
        } else {
            BackHandler.exitApp()
        }
    }
    const loadFiles = async (path) => {
        let result = await RNFS.readDir(path)
        //sort by type
        let folders = result.filter(i => i.isDirectory())
        let files = result.filter(i => i.isFile())
        result = [...folders, ...files]
        return result;
    };

    //copy/move logic
    const copyOrMoveDirectory = async (sourcePath, targetPath) => {
        try {
            const exists = await RNFS.exists(sourcePath);
            if (!exists) {
                console.log('Source directory does not exist');
                return;
            }

            // Create the target directory if it doesn't exist
            await RNFS.mkdir(targetPath);

            // Get the list of files and directories in the source directory
            const items = await RNFS.readdir(sourcePath);

            // Loop through each item in the source directory
            for (const item of items) {
                const itemPath = `${sourcePath}/${item}`;
                const targetItemPath = `${targetPath}/${item}`;

                // Check if the item is a directory
                const stat = await RNFS.stat(itemPath);
                if (stat.isDirectory()) {
                    // Recursively copy or move the directory
                    await copyOrMoveDirectory(itemPath, targetItemPath);
                } else {
                    // If the item is a file, copy or move it to the target directory
                    if (operationType == 1) {
                        await RNFS.copyFile(itemPath, targetItemPath);
                    } else {
                        await RNFS.moveFile(itemPath, targetItemPath);
                    }
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const shiftItems = async () => {
        setProgressType(operationType)
        let tempRemovedItems = []
        let tempAddedItems = []
        await Promise.all(tabs[operationTab]["selectedItems"].map(async (item) => {
            if (item.isDirectory()) {
                await copyOrMoveDirectory(item["path"], tabs[currTab]["path"] + "/" + item["name"])
            } else {
                if (operationType == 1) {
                    await RNFS.copyFile(item["path"], tabs[currTab]["path"] + "/" + item["name"])
                } else {
                    await RNFS.moveFile(item["path"], tabs[currTab]["path"] + "/" + item["name"])
                    tempRemovedItems.push(item)
                }
            }
            const stat = await RNFS.stat(tabs[currTab]["path"] + "/" + item["name"])
            stat["name"] = item["name"]
            tempAddedItems.push(stat)
        })
        )
        setRemovedItems(tempRemovedItems)
        setAddedItems(tempAddedItems)
        if (operationType == 1) {
            ToastAndroid.showWithGravity(
                "Copy completed.",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        } else {
            ToastAndroid.showWithGravity(
                "Move completed.",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
        setOperationType(-1)
        setProgressType(-1)
    }

    const deleteItems = async () => {
        setProgressType(operationType)
        let failedItems = []
        let tempRemovedItems = []
        await Promise.all(tabs[operationTab]["selectedItems"].map(async (item) => {
            try {
                await RNFS.unlink(item["path"])
                tempRemovedItems.push(item)
            } catch (error) {
                failedItems.push(item["name"])
                console.error('Error deleting file:', item["name"], error);
            }
        }))
        setRemovedItems(tempRemovedItems)
        setProgressType(-1)
        if (failedItems.length == 0)
            return []
        else
            return failedItems

    }

    const navigateUp = (path) => {
        const parts = path.split('/');
        parts.pop();
        const folderName = parts[parts.length - 1];
        const parentPath = parts.join('/');
        let tempTabs = { ...tabs }
        tempTabs[currTab]["path"] = parentPath
        setTabs(tempTabs)
        return (parentPath)
    }

    return (
        <View style={{ backgroundColor: '#06161C', flexDirection: 'column', flex: 1 }}>
            <TouchableOpacity onPress={() => console.warn("-----")}><Text>Divide</Text></TouchableOpacity>
            {/* <ProgressModal progressPercent={progressPercent} /> */}
            {
                useMemo(() => {
                    Object.keys(tabs).map((tabNo, indx) => {
                        //console.log(indx)
                        return (
                            <Window
                                key={tabNo}
                                indx={indx}
                                tabs={tabs}
                                thisTabNo={tabNo}
                                currTab={currTab}

                                operationTab={operationTab}
                                setOperationTab={setOperationTab}
                                operationType={operationType}
                                setOperationType={setOperationType}
                                progressType={progressType}
                                setProgressType={setProgressType}
                                addedItem={addedItems}
                                removedItems={removedItems}

                                tab={tabs[tabNo]}
                                setTabs={setTabs}
                                loadFiles={loadFiles}
                                shiftItems={shiftItems}
                                deleteItems={deleteItems}
                                navigateUp={navigateUp}
                                bottomSheet={bottomSheet}
                                setBottomSheet={setBottomSheet} />
                        )
                    }
                    )
                }, [123])
            }
            {progressType > -1 ?
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#152024', marginHorizontal: 20, marginTop: 10, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                        <ActivityIndicator />
                        <Text style={[styles.text, { color: '#979899', fontSize: 10 }]}>{progressType == 0 && "Moving"}{progressType == 1 && "Copying"}{progressType == 2 && "Deleting"} items...</Text>
                    </View>
                </View>
                : null}
            <ScrollView
                horizontal
                style={{
                    flexGrow: 0,
                    display: bottomSheet ? "flex" : "none",
                }}
                showsHorizontalScrollIndicator={false}
            >
                <View style={[styles.paddingVertical, {
                    flexDirection: 'row',
                    gap: 10,
                }]}>
                    {Object.keys(tabs).map((tabNo) => {
                        console.log("aa")
                        return (
                            <View key={tabNo} style={[styles.button, tabNo === currTab ? styles.buttonHighlight : styles.buttonBasic]}>
                                {/* <View style={{ padding: 20, paddingEnd: 10 }}></View> */}
                                <TouchableOpacity style={{ padding: 20, flexDirection: 'row', alignItems: 'center', gap: 10 }} onPress={() => setCurrTab(tabNo.toString())}>
                                    {tabNo === currTab && progressType > -1 ? <ActivityIndicator /> : <Image source={require('../assets/folder.png')}
                                        style={{ width: 15, height: 15 }} />}
                                    <Text style={[styles.text, tabNo === currTab ? styles.buttonTextHighlight : styles.buttonTextBasic]}>
                                        {tabs[tabNo]['name']}
                                    </Text>
                                </TouchableOpacity>
                                {tabNo == currTab &&
                                    <TouchableOpacity style={{ padding: 20, paddingStart: 10 }} onPress={() => deleteTab(tabNo)}>
                                        <Text style={[styles.text, styles.buttonTextHighlight]}>⨯</Text>
                                    </TouchableOpacity>}
                            </View>
                        )
                    })}
                    <TouchableOpacity style={[styles.button, styles.buttonBasic, styles.padding]} onPress={() => addTab()}>
                        <Text style={[styles.text, styles.buttonTextBasic]}>+</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View >
    )
}
export default App