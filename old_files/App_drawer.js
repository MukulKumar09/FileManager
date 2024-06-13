import * as React from 'react';
import { Button, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import RNFS from 'react-native-fs';

const loadFiles = async (path) => {
    console.log("loadfiles ran")
    let result = await RNFS.readDir(path)
    //sort by type
    let allFolders = result.filter(i => i.isDirectory())
    let allFiles = result.filter(i => i.isFile())
    result = [...allFolders, ...allFiles]
    return result
};
function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => navigation.navigate('Notifications')}
                title="Go to notifications"
            />
        </View>
    );
}

function NotificationsScreen({ navigation }) {
    const [val, setVal] = React.useState(0)
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => setVal(val + 1)} title="Increase" />
            <Text style={{ color: '#000' }}>{val}</Text>
        </View>
    );
}
const Icon = (ext) => {
    switch (ext) {
        case "mp3":
            return (<Image source={require('./assets/music.png')} />)
        default:
            return (<Text style={{ fontFamily: 'Pop-reg', color: '#979899', fontSize: 10 }}>{ext}</Text>)
    }
}

const NotificationsScreen1 = ({ navigation }) => {
    const [val, setVal] = React.useState(0)
    const [currPath, setCurrPath] = React.useState(RNFS.ExternalStorageDirectoryPath)
    const [filesList, setFilesList] = React.useState([])
    const [selectionFlag, setSelectionFlag] = React.useState(0)
    const [searchTerm, setSearchTerm] = React.useState("")
    React.useEffect(() => {
        console.log("currpath useeffect reran")
        const handleCurrPathUpdate = async () => {
            let loadedFiles = await loadFiles(currPath)
            setFilesList(loadedFiles)
        }
        handleCurrPathUpdate()
    }, [currPath])

    return (
        <FlatList
            style={{ backgroundColor: '#06161C' }}
            data={filesList}
            keyExtractor={(item) => item.path}
            renderItem={({ item }) => {
                let ext = ""
                if (item.isFile()) {
                    const parts = item.name.split(".")
                    ext = parts[parts.length - 1]
                }

                return (
                    <TouchableOpacity onPress={() => {
                        selectionFlag || searchTerm !== "" ? selectItem(item) : item.isDirectory() ? setCurrPath(item.path) : handleFile(item)
                    }} onLongPress={() => { selectionFlag ? (!tab["selectedItems"].includes(item) ? rangeSelect(item) : {}) : selectItem(item) }}><View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 20
                        }}
                    ><>{item.isDirectory() ? <Image source={require('./assets/folder.png')} /> : Icon(ext)}</><Text style={{ width: '80%', color: 'white' }}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }
            }
        />
    );
}


const Drawer = createDrawerNavigator();

export default function App() {
    const [val, setVal] = React.useState(0)
    const navigationRef = createNavigationContainerRef();
    function navigate(name) {
        if (navigationRef.isReady()) {
            navigationRef.navigate(name);
        }
    }

    return (
        <>
            <NavigationContainer ref={navigationRef}>
                <Drawer.Navigator>
                    <Drawer.Screen name="Home" component={HomeScreen} />
                    <Drawer.Screen name="Notifications" component={NotificationsScreen} />
                    <Drawer.Screen name="Notifications1" component={NotificationsScreen1} />
                </Drawer.Navigator>
            </NavigationContainer>

            <TouchableOpacity
                style={{ padding: 10, backgroundColor: 'lightgray', marginBottom: 10 }}
                onPress={() => navigate('Home')}>
                <Text>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ padding: 10, backgroundColor: 'lightgray', marginBottom: 10 }}
                onPress={() => navigate('Notifications')}>
                <Text>Notifs</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ padding: 10, backgroundColor: 'lightgray', marginBottom: 10 }}
                onPress={() => navigate('Notifications1')}>
                <Text>Notifs</Text>
            </TouchableOpacity>

        </>
    );
}